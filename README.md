# AgriConnect — Smart Agriculture Platform (MVP)

A MERN-stack platform for farmers: farm management, rule-based crop recommendations,
weather, expense tracking, market prices, government schemes, and a community forum.

## Stack
- **Frontend**: React (Vite), React Router, Context API, Tailwind CSS, Framer Motion,
  React Three Fiber/drei (3D hero), Chart.js
- **Backend**: Node.js, Express, Mongoose, JWT auth, Multer
- **Database**: MongoDB (local by default; swap to Atlas via `MONGO_URI`)

## What's live in this MVP
1. Farmer auth (register/login) + profile
2. Farm CRUD (name, area, soil type, location)
3. Crop recommendation — rule-based on soil/season/temperature/rainfall
4. Weather — live via OpenWeather if you add a key, otherwise clearly-labeled mock data
5. Farm expense tracker — CRUD + charts (income vs expense, category breakdown)
6. Market price dashboard — seeded sample data, filterable by crop/state
7. Government schemes — seeded sample data (PM-KISAN, PMFBY, KCC, etc.), filterable
8. Community forum — posts with optional image upload, comments, likes

**Deferred to a later pass** (not built yet): disease detection AI, fertilizer
recommendation, expert consultation (chat/video), equipment rental, smart irrigation,
and the bonus features (voice input, multilingual UI, PWA/offline mode, SMS alerts,
QR codes, push notifications, crop calendar, satellite maps). Most of these need paid
third-party accounts (Cloudinary, Plant.id/Hugging Face, Twilio, Google Maps, a video
SDK) that aren't configured yet.

## Getting started

### 1. Database
A local MongoDB is used by default (`mongodb://127.0.0.1:27017/agriconnect`). Start it with:
```bash
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "D:\AgriConnect\server\data\db" --port 27017
```
Or point `MONGO_URI` in `server/.env` at a MongoDB Atlas cluster instead.

### 2. Backend
```bash
cd server
npm install
npm run seed   # populates market prices + government schemes
npm run dev    # http://localhost:5000
```

### 3. Frontend
```bash
cd client
npm install
npm run dev    # http://localhost:5173
```

## Adding real API keys later
Copy `server/.env.example` to `server/.env` (already done with a generated JWT secret)
and fill in:
- `OPENWEATHER_API_KEY` — enables live weather instead of mock data
- `CLOUDINARY_*` + `USE_CLOUDINARY=true` — switches forum image uploads from local disk
  to Cloudinary (implement the swap in `server/middleware/upload.js` / a new
  `config/cloudinary.js` when ready)

No frontend changes are required when you add these — the API responses already carry
a `source`/`fallbackReason` flag so the UI adapts automatically.
