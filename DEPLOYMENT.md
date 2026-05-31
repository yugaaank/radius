# Radius Deployment & Local Setup Guide

Radius is designed to work in two modes: **Live (Local-First)** and **Demo (Hosted)**.

## 1. Local-First Mode (Recommended for Developers)
In this mode, Radius runs on your machine and uses the [Coral CLI](https://github.com/google/gemini-cli) to securely query your APIs locally.

### Prerequisites
- [Bun](https://bun.sh) installed.
- [Coral CLI](https://github.com/google/gemini-cli) installed and configured with your sources (GitHub, Notion, etc.).

### Setup
1. **Start the Backend:**
   ```bash
   cd radius-backend
   bun install
   bun run src/index.ts
   ```
2. **Start the Frontend:**
   ```bash
   cd radius-frontend
   bun install
   bun run dev
   ```
3. Open `http://localhost:3000` and ensure the toggle is set to **"Live"**.

---

## 2. Hosted / Demo Mode (Hackathon Submission)
If you are viewing a hosted version of Radius, it likely defaults to **Demo Mode** to provide a consistent experience without requiring local API tokens.

### Deployment Configuration
The frontend and backend use environment variables to communicate.

#### Backend Environment Variables
- `PORT`: The port the backend runs on (default: `3001`).
- `FRONTEND_ORIGIN`: The URL of your deployed frontend (to allow CORS).
- `FORCE_DEMO`: Set to `true` to disable Coral queries and only serve demo data.

#### Frontend Environment Variables
- `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://api.radius-app.com`).

---

## 3. Docker (Universal Setup)
You can run the entire stack using Docker. This is useful for testing the "Live" logic in a controlled environment.

```bash
docker build -t radius .
docker run -p 3000:3000 -p 3001:3001 radius
```
