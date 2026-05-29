# Flood Monitoring System

Cloud-deployed flood monitoring system with a web dashboard, Django API backend, Arduino serial data forwarder, and Expo mobile app.

## Live Links

- Web app: https://flood-monitoring-system2.vercel.app
- Backend API health: https://flood-monitoring-api.onrender.com/api/health/
- Mobile app source: https://github.com/villarfin/FloodMonitoringSystem/tree/main/mobile-app
- Deployment notes: [DEPLOYMENT.md](DEPLOYMENT.md)

## Project Structure

```text
backend/                  Django + Django REST Framework API
frontend/                 Vite React web dashboard
mobile-app/               Expo React Native mobile app
arduino_serial_forwarder.py
render.yaml               Render backend/database blueprint
vercel.json               Vercel web deployment config
DEPLOYMENT.md             Deployment and login notes
```

## Deployment Status

- Frontend is deployed on Vercel as `flood-monitoring-system2`.
- Backend is deployed on Render as `flood-monitoring-api`.
- Mobile APK builds are handled by Expo EAS under `@zaneeymal/flood-monitoring-apk`.
- The APK uses the public Render backend URL through `EXPO_PUBLIC_API_BASE_URL`.

Latest in-progress EAS build:

```text
https://expo.dev/accounts/zaneeymal/projects/flood-monitoring-apk/builds/78fedfe7-b5cb-43d7-9308-4ef0bab29386
```

Previous finished APK:

```text
https://expo.dev/artifacts/eas/pC15raX7Uaj933qU5KLpYJ.apk
```

## Local Development

### Backend

```powershell
cd backend
python -m venv ..\.venv
..\.venv\Scripts\Activate.ps1
pip install -r ..\requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Local API:

```text
http://127.0.0.1:8000/api
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Local web app:

```text
http://127.0.0.1:5173/
```

Use this environment variable for production Vercel:

```text
VITE_API_BASE_URL=https://flood-monitoring-api.onrender.com/api
```

### Mobile App

```powershell
cd mobile-app
npm install
npm run start
```

For local phone testing on the same Wi-Fi, use the laptop LAN IP:

```text
EXPO_PUBLIC_API_BASE_URL=http://172.30.1.113:8000/api
```

For cloud APK builds, use:

```text
EXPO_PUBLIC_API_BASE_URL=https://flood-monitoring-api.onrender.com/api
```

Build an Android APK:

```powershell
cd mobile-app
npx eas-cli build --platform android --profile preview
```

## IoT Data Flow

The Arduino sends serial JSON over USB to the laptop. The laptop runs `arduino_serial_forwarder.py`, and that script posts readings to the backend API.

For cloud backend posting:

```powershell
$env:IOT_SERVER_URL="https://flood-monitoring-api.onrender.com/api/iot/reading/"
python arduino_serial_forwarder.py
```

The cloud web and mobile apps can still open when the laptop is off, but live Arduino USB updates stop unless the serial forwarder is running.

If the Arduino USB cable is unplugged and plugged back in, keep the forwarder running. It will scan for the Arduino again and reconnect automatically. If the port is busy, close Arduino IDE Serial Monitor and rerun the forwarder.

## Useful Checks

```powershell
npm run build
cd mobile-app
npx tsc --noEmit
npx eas-cli build:list --platform android --limit 3
```
