import os
import sys
import time
import json
import serial
import serial.serialutil
import serial.tools.list_ports
import requests

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(line_buffering=True)
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(line_buffering=True)

# ══════════════════════════════════════════════════════════════════════════════
#  JSON SERIAL TO HTTP FORWARDER FOR ARDUINO MEGA
# ══════════════════════════════════════════════════════════════════════════════
#
# This script is custom-tailored for your Arduino Mega code which outputs 
# JSON data over USB Serial in the format:
#   {"distance": 10.50, "waterLevel": 3.50, "status": "SAFE"}
#
# The script parses this serial JSON and forwards it to the FastAPI Server.
#
# ══════════════════════════════════════════════════════════════════════════════

# 1. Serial configuration
# Override with env var: set ARDUINO_PORT=COM7
# On Mac/Linux use /dev/ttyACM0 or /dev/tty.usbmodem*
SERIAL_PORT = os.environ.get("ARDUINO_PORT", "")
BAUD_RATE = 9600
RECONNECT_DELAY_SECONDS = 2


def find_arduino_port() -> str | None:
    """Pick USB serial port (Arduino Mega) when ARDUINO_PORT is not set."""
    preferred = []
    for port in serial.tools.list_ports.comports():
        desc = (port.description or "").lower()
        hwid = (port.hwid or "").lower()
        if "bluetooth" in desc:
            continue
        if any(k in desc for k in ("usb serial", "arduino", "ch340", "cp210", "mega")):
            preferred.append(port.device)
        elif "usb" in desc or "2341" in hwid:  # 2341 = Arduino VID
            preferred.append(port.device)
    return preferred[0] if preferred else None


def open_serial_connection() -> serial.Serial | None:
    """Open the configured Arduino serial port, or auto-detect it."""
    port = SERIAL_PORT or find_arduino_port()
    if not port:
        print("[ERROR] No Arduino serial port found.")
        print("[TIP] Plug in the board, close Arduino IDE Serial Monitor, then run:")
        print('       set ARDUINO_PORT=COM7  (use your port from Device Manager)')
        return None

    print(f"Connecting to Arduino Mega on {port} @ {BAUD_RATE} baud...")
    try:
        ser = serial.Serial(port, BAUD_RATE, timeout=2)
        time.sleep(2) # Give the Arduino Mega 2 seconds to reset after connection
        print("[+] Connected successfully! Listening for JSON sensor data...")
        return ser
    except Exception as e:
        print(f"[ERROR] Could not open serial port {port}. Details: {e}")
        print("[TIP] Make sure the Arduino IDE Serial Monitor is CLOSED before running this script!")
        return None

# 2. 📡 Server Configuration
# If the Arduino is connected to a DIFFERENT laptop:
#   -> Change 'localhost' to the local IP address of your server laptop (e.g., '192.168.1.150').
# If the Arduino is plugged DIRECTLY into the server laptop:
#   -> Keep 'localhost'.
SERVER_URL = os.environ.get("IOT_SERVER_URL", "http://127.0.0.1:8000/api/iot/reading/")
API_KEY = os.environ.get("IOT_API_KEY", "flood-iot-secret-2026")

# 3. 🌊 Location Configuration
LOCATION_NAME = "Cagayan De Oro River"
MAX_LEVEL_CM = float(os.environ.get("IOT_MAX_LEVEL_CM", "14.0"))

def map_status(arduino_status):
    """
    Maps the Arduino's status string to what the FastAPI backend expects:
      "SAFE"    -> "Normal"
      "WARNING" -> "Warning"
      "DANGER"  -> "Danger"
    """
    status_upper = str(arduino_status).strip().upper()
    if status_upper == "SAFE":
        return "Normal"
    elif status_upper == "WARNING":
        return "Warning"
    elif status_upper == "DANGER":
        return "Danger"
    return "Normal" # Fallback default

def main():
    ser = open_serial_connection()
    last_level = None

    while True:
        try:
            if ser is None or not ser.is_open:
                print(f"[RECONNECT] Waiting {RECONNECT_DELAY_SECONDS}s before scanning for Arduino...")
                time.sleep(RECONNECT_DELAY_SECONDS)
                ser = open_serial_connection()
                continue

            if ser.in_waiting > 0:
                # Read the line printed by Arduino Mega (e.g. '{"distance": 10.50, "waterLevel": 3.50, "status": "SAFE"}\r\n')
                raw_line = ser.readline().decode('utf-8', errors='ignore').strip()
                if not raw_line:
                    continue
                
                # Skip the startup message if printed
                if "FLOOD MONITORING SYSTEM STARTED" in raw_line:
                    print("[!] Arduino Mega started up!")
                    continue
                
                print(f"[Serial] Arduino Serial: {raw_line}")
                
                # Parse the JSON string
                try:
                    arduino_data = json.loads(raw_line)
                except json.JSONDecodeError:
                    # Ignore malformed/partial JSON buffers
                    continue

                # Extract variables
                current_level = float(arduino_data.get("waterLevel", 0.0))
                arduino_status = arduino_data.get("status", "SAFE")
                
                # Map safety status
                status = map_status(arduino_status)

                # Determine trend
                trend = "Steady"
                if last_level is not None:
                    if current_level > last_level + 0.05:
                        trend = "Rising"
                    elif current_level < last_level - 0.05:
                        trend = "Falling"
                last_level = current_level

                # Build the JSON payload for FastAPI
                payload = {
                    "location_name": LOCATION_NAME,
                    "current_level": current_level,
                    "max_level": MAX_LEVEL_CM,
                    "status": status,
                    "trend": trend,
                    "api_key": API_KEY
                }

                # Forward to FastAPI Server
                print(f"[Forwarding] Forwarding to server -> Level: {current_level}cm, Status: {status}, Trend: {trend}...")
                headers = {"Content-Type": "application/json"}
                response = requests.post(SERVER_URL, json=payload, headers=headers, timeout=10)

                if response.status_code == 201:
                    print(f"[SUCCESS] Server logged: {response.json()}")
                else:
                    print(f"[SERVER ERROR] ({response.status_code}): {response.text}")

        except KeyboardInterrupt:
            print("\nShutting down forwarder...")
            if ser is not None and ser.is_open:
                ser.close()
            break
        except serial.serialutil.SerialException as e:
            print(f"[SERIAL ERROR] Arduino connection lost: {e}")
            if ser is not None:
                try:
                    ser.close()
                except Exception:
                    pass
            ser = None
            last_level = None
        except Exception as e:
            print(f"[ERROR] Error reading/forwarding data: {e}")
            if "ClearCommError" in str(e):
                print("[SERIAL ERROR] Arduino connection appears to be disconnected. Reconnecting...")
                if ser is not None:
                    try:
                        ser.close()
                    except Exception:
                        pass
                ser = None
                last_level = None
            time.sleep(2)

        time.sleep(0.1)

if __name__ == '__main__':
    main()
