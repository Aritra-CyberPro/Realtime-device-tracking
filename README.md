# Realtime Device Tracking (DEMO)
## Overview
The project is a front-end demo web app that simulates real-time location tracking. It’s designed for safe use in portfolios, social media posts, or UI showcases. Instead of connecting to real devices, it generates mock GPS updates in the browser to look realistic.
# Features
• **Login Screen**: <br>
-- Simple login form (no backend, just browser localStorage). <br>
-- “Skip demo” option. <br>
<br>
• **Dashboard**: <br>
-- Key metrics (total devices, online, offline). <br>
-- Device table (label, ID, owner, phone, status). <br>
<br>
• **Live Map (Leaflet + OpenStreetMap)**: <br>
-- Interactive map. <br>
-- Devices appear with moving markers. <br>
-- Path/route history per device. <br>
-- Dropdown to switch between devices. <br>
-- Automatic updates every 2 seconds (simulated via mock WebSocket). <br>
-- “Last update” timestamp. <br>
<br>
• **Devices Page**: <br>
-- Device list (same as dashboard table).. <br>
-- “Add device” button (demo only, no backend). <br>
<br>
• **Settings Page**: <br>
-- Company name input (demo). <br>
-- Update interval (fixed at 2s in demo). <br>
-- Tracking policy dropdown (work hours / always / disabled). <br>
-- Export demo data to JSON (saves mock devices and paths). <br>
<br>
• **UI/UX**: <br>
-- Modern dark theme. <br>
-- Sidebar navigation. <br>
-- Responsive design (desktop & mobile) <br>
-- Styled cards, tables, and KPIs. <br>
<br>

## ⚙️ Pre-requisites (to run the demo) <br>
• A modern web browser (Chrome, Edge, Firefox, etc.). <br>
• No server required — just open ```index.html```. <br>
• If you want to serve it, any static web server (e.g., ```python -m http.server```) works.

## 🛠 Tech Stack <br>
• **rontend:** HTML, CSS, JavaScript <br>
• **Map Library:** [Leaflet.js](https://leafletjs.com/) with OpenStreetMap tiles. <br>
• **Data Storage:** Browser ```localStorage``` (no backend). <br>
• **Mock Realtime Updates:** Simulated “WebSocket” in JavaScript ```(setInterval)```. <br>
<br>
## 🚀 Installation <br>
**1. Clone the repository or download zip file**:
```
https://github.com/Aritra-CyberPro/Realtime-device-tracking.git
```
```
cd Realtime-device-tracking.git
```
**2. Open the Project**: <br>
No build tools are required. The project is pure HTML, CSS, and JavaScript. <br>
• Option A: Open ```index.html``` directly in your browser. <br>
• Option B: Use a simple local server for a smoother experience: <br>
```
# Python 3
python -m http.server 8000
```
Then open ```http://localhost:8000``` in your browser.
<br>
### Note:
This demo does not require any real login. You can simply click **Skip (Demo)** on the login page to enter directly.

## License: <br>
This project is licensed under the [MIT License](https://github.com/Aritra-CyberPro/Realtime-device-tracking/blob/main/LICENSE). See the LICENSE file for details.

## Author: <br>
[@Aritra](https://github.com/Aritra-CyberPro)
