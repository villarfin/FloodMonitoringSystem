# Deployment Notes

## Current Local Services

- Web app: `http://127.0.0.1:5173/`
- Backend API: `http://127.0.0.1:8000/api`
- Mobile/phone API URL on this network: `http://172.30.1.113:8000/api`

## Important IoT Rule

The IoT device does not post directly from Arduino Ethernet/Wi-Fi in the current setup. The Arduino sends serial JSON over USB, and `arduino_serial_forwarder.py` posts it to the backend.

For cloud deployment, the forwarder must post to the public backend URL:

```powershell
$env:IOT_SERVER_URL="https://your-public-backend.example.com/api/iot/reading/"
python arduino_serial_forwarder.py
```

## Vercel Web App

The Vercel frontend must use a public backend URL:

```text
VITE_API_BASE_URL=https://your-public-backend.example.com/api
```

Do not use `127.0.0.1` or a LAN IP for production Vercel, because Vercel users and the hosted app cannot reach your laptop.

## Render Backend

This repo includes a `render.yaml` Blueprint that creates:

- `flood-monitoring-api` Django web service
- `flood-monitoring-db` PostgreSQL database

In Render:

1. Open `https://dashboard.render.com/blueprints`.
2. Click **New Blueprint Instance**.
3. Connect `https://github.com/villarfin/FloodMonitoringSystem`.
4. Select the `main` branch.
5. Apply the Blueprint.

After the deploy finishes, your backend API will look like:

```text
https://flood-monitoring-api.onrender.com/api
```

Use the actual Render URL in Vercel:

```text
VITE_API_BASE_URL=https://flood-monitoring-api.onrender.com/api
```

And use the same backend for the Arduino serial forwarder:

```powershell
$env:IOT_SERVER_URL="https://flood-monitoring-api.onrender.com/api/iot/reading/"
python arduino_serial_forwarder.py
```

Render free services can sleep after inactivity, so the first request after a pause may be slow.

## Mobile APK

The APK must also use a reachable backend:

```text
EXPO_PUBLIC_API_BASE_URL=https://your-public-backend.example.com/api
```

For local testing on the same Wi-Fi, use:

```text
EXPO_PUBLIC_API_BASE_URL=http://172.30.1.113:8000/api
```

## Missing Tools On This Machine

These commands were initially not available in the current shell:

- `gh`
- `vercel`
- `java`
- `gradle`
- `adb`

Node/npm and GitHub CLI were installed or found, but GitHub CLI still requires login.

## Required Logins To Finish

```powershell
gh auth login
npx eas-cli login
npx vercel login
```

Current status:

- Vercel CLI is logged in as `villarfin`.
- GitHub CLI is not logged in.
- Expo EAS is logged in as `zaneeymal`.

## Existing Vercel Projects

The Vercel account already has:

- `flood-monitoring-system2`
- `floodmonitoringsystem`

Create a new Vercel project only after setting a public backend API URL.
