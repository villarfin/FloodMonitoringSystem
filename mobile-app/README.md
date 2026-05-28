# Flood Monitoring Mobile App

Expo React Native mobile app for the Flood Monitoring System.

## What It Does

- Polls the same backend as the web app every 2.5 seconds.
- Shows the latest Arduino IoT reading.
- Shows all monitored water stations.
- Uses the prototype thresholds from the Arduino sketch:
  - Safe: below 6 cm
  - Warning: 6 cm to below 10 cm
  - Danger: 10 cm and above
  - Max prototype level: 14 cm

## Local Setup

Install dependencies:

```powershell
npm install
```

Create `.env`:

```powershell
copy .env.example .env
```

Use your backend URL in `.env`. A phone cannot use `127.0.0.1` to reach your laptop, so use your laptop LAN IP:

```text
EXPO_PUBLIC_API_BASE_URL=http://172.30.1.113:8000/api
```

Start the app:

```powershell
npm run start
```

Build an APK with EAS:

```powershell
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

## IoT Data Flow

Arduino Mega -> `arduino_serial_forwarder.py` -> Django backend -> mobile app polling API.

The Arduino Serial Monitor must be closed because only one program can use the COM port at a time.
