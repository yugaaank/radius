# Radius: Architecture & Tech Stack

## 🏗️ System Architecture: The "Hub-and-Spoke" Model

Radius is built to solve "Context Fragmentation" by unifying disparate tools into a single intelligence stream. It operates across three distinct layers:

---

### 1. Data Layer: SQL-as-an-Integration
**Powered By:** `Coral CLI`

Instead of writing custom API wrappers for every service (GitHub, ClickUp, Notion, etc.), Radius treats the entire cloud infrastructure as a local relational database.
*   **Federated Queries:** Coral translates REST/gRPC endpoints into SQL tables.
*   **Cross-Source Joins:** We can execute complex queries (e.g., joining a GitHub commit with a ClickUp task) to detect anomalies like "Zombie Tasks."
*   **Local-First Security:** API tokens are managed securely on the host machine by the Coral CLI. They are never sent to a cloud database.

---

### 2. Intelligence Layer: The Decision Engine
**Powered By:** `Bun` + `Express` + `TypeScript`

A high-speed backend that acts as the "brain" of Radius.
*   **The Urgency Algorithm:** It pulls the SQL data and calculates a multi-factor **Radius Score** based on due dates, impact metrics, and blocker status.
*   **Correlation Engine:** Identifies relationships between different items (e.g., an outage in Sentry linked to a specific PR in GitHub).
*   **Flexible Deployment:** Features a `FORCE_DEMO` middleware that safely simulates the Coral CLI environment for cloud hosting and hackathon presentations.

---

### 3. Visualization Layer: The Interactive Canvas
**Powered By:** `Next.js` + `React` + `Framer Motion` + `Tailwind CSS`

A radical departure from static lists and Kanban boards.
*   **Spatial Mapping:** Items are plotted dynamically on an interactive Radar canvas. 
*   **Gravity Rules:** Critical and urgent items gravitate to the center "NOW" ring; stale backlog items drift outward to the "LATER" rings.
*   **Infinite Pan & Zoom:** Built for deep exploration, allowing engineers to view the 30,000-foot health of the organization or zoom into a specific, isolated incident.

---

## ⚡ Key Technologies
*   **Runtime:** Bun (Backend), Node.js (Frontend Build)
*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS, Radix UI Primitives
*   **Engine:** Coral CLI (Local SQL Engine)
*   **State & Animation:** React Hooks, Framer Motion
