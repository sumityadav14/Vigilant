git# VIGILANT — AI Smart Vehicle, Traffic & Citizen Management Platform
**B.Tech CSE (Artificial Intelligence) Major Project**

---

## 🌟 Executive Project Overview

**VIGILANT** is a Smart City project with a browser frontend and an Express REST API. Its currently implemented persistent-data routes use MongoDB through Mongoose for authentication, vehicles, challans, and document records. Camera, violation, analytics, stolen-vehicle, and vehicle Re-ID endpoints are not configured and return `501 NOT_CONFIGURED`; the frontend pages for these features are prototypes, not live telemetry.

The platform combines edge AI object detection (**YOLOv8** for traffic violation classification) and deep visual feature extraction (**ResNet-50** 512D embeddings for vehicle re-identification) with a modern dark-themed SaaS web interface. It bridges the gap between traffic police command centers and vehicle owners, featuring digital document vaults, automated expiry reminders, high-resolution evidence inspection, dispute review workflows, multi-camera spatial GIS tracking maps, emergency stolen vehicle alert networks, and an interactive Conversational AI Assistant.

---

## 📂 Complete Project Structure

```text
vigilant/
├── index.html                   # Platform Landing Page (Hero, Stats Ticker, Feature Grid)
├── login.html                   # Dual-Role Login (Citizen & Authority Portal Toggle)
│
├── citizen/                     # Citizen Services Suite (10 Pages)
│   ├── dashboard.html           # Main Citizen Portal Overview
│   ├── my-vehicles.html         # Registered Vehicles Grid & + Add Vehicle Modal
│   ├── vehicle-details.html     # Vehicle Technical Specs, RC, Insurance, PUC & HPA Sub-tabs
│   ├── challan-list.html        # Filterable Traffic Challans Data Table
│   ├── challan-details.html     # AI Violation Snapshot Evidence Inspection Frame
│   ├── dispute-review.html      # Formal Challan Dispute Submission Form & Review State
│   ├── document-vault.html      # Centralized RC, Insurance, and PUC Vault (7-Day Warning)
│   ├── hypothecation-assistant.html # Guided 5-Step HPA Removal Progress Tracker & Form 35
│   ├── stolen-report.html       # 🚨 Emergency Stolen Vehicle Report Form & FIR Upload
│   └── notifications-center.html# Notification Stream & Document Expiry Reminders Hub
│
├── authority/                   # Police Command Center Suite (9 Pages)
│   ├── dashboard.html           # Traffic Command Center Dashboard & Live Stream
│   ├── cameras.html             # 24/7 CCTV Live Surveillance Grid & Fullscreen Viewer
│   ├── violations.html          # AI Traffic Violation Detector & Bounding Box Inspector
│   ├── vehicle-reid.html        # AI Vehicle Re-ID Search (512D Embeddings & Match Timeline)
│   ├── tracking.html            # Leaflet.js Interactive Multi-Camera Spatial GIS Route Map
│   ├── stolen-search.html       # AI Stolen Vehicle Search Network & Patrol Dispatch Alert
│   ├── ai-models.html           # AI Pipeline Inspector (YOLOv8 Slider & Cosine Similarity)
│   ├── analytics.html           # Chart.js Analytics Center (4 Interactive Visualizations)
│   ├── maps.html                # Full-screen GIS Interactive Layer Control Map
│   └── reports.html             # Traffic & Enforcement Report Generator & CSV/PDF Exporter
│
├── css/                         # Modular CSS Design System
│   ├── global.css               # Design Tokens, Midnight Dark Palette, Glassmorphism
│   ├── components.css           # Buttons, Forms, Dark Tables, Modals, Badges, Toasts & AI Bot
│   ├── dashboard.css            # Sidebar Layout, Top Header, Camera Grid & Activity Ticker
│   └── responsive.css           # Mobile & Tablet Drawer Overlays & Flex Adapters
│
├── js/                          # Core JavaScript Engines
│   ├── auth.js                  # Session & Role Engine (localStorage State Control)
│   ├── app.js                   # Main UI Controllers, Modals, Toasts, Chart.js & Maps
│   ├── ai-sim.js                # AI Simulation Engine (Confidence Slider & Vector Math)
│   ├── api.js                   # REST API Service Abstraction (Fetch Client Wrappers)
│   └── ai-chat.js               # Conversational AI Assistant Engine (Trained Knowledge Base)
│
├── backend/                     # Express REST API and MongoDB models
│   ├── server.js                # Express API using Mongoose
│   ├── models/                  # User, Vehicle, Challan, and Document models
│   └── schema.sql               # Legacy SQL schema reference; not used by the API
│
├── aws-architecture.md          # Production AWS Cloud Deployment Architecture Specification
└── PROJECT_DEFENSE_GUIDE.md     # Academic Project Report, 15-Slide Deck, Script & 15 Viva Q&As
```

---

## 🛠️ Technology Stack Breakdown

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend UI/UX** | HTML5, CSS3 (Glassmorphism Dark Theme), JavaScript ES6+ (Vanilla) |
| **Icons & Media** | Lucide Icons CDN, Unsplash High-Res Traffic Visuals |
| **Data Analytics** | Chart.js (Bar, Line, Doughnut, Horizontal Bar Charts) |
| **Spatial GIS Mapping** | Leaflet.js Map Library, OpenStreetMap & CartoDB Dark Tiles |
| **Conversational AI** | Natural Language Intent Classifier Engine (`js/ai-chat.js`) |
| **AI Computer Vision** | Prototype pipeline code; not connected to the current REST API |
| **REST API Layer** | Fetch API Service Client (`js/api.js`) |
| **Backend Server** | Node.js, Express.js REST API Server (`backend/server.js`) |
| **Database** | MongoDB accessed through Mongoose models in `backend/models/` |
| **Cloud Production** | Proposed AWS deployment plan in `aws-architecture.md`; not the current runtime database |

---

## ⚡ How to Run & Demonstrate the Project

1. Configure `MONGODB_URI` and `JWT_SECRET` in `backend/.env`.
2. Start the API from the project root:
```powershell
cd backend
npm install
npm start
```
3. In a second terminal at the project root, serve the frontend:
```powershell
python -m http.server 8000
```
Open `http://localhost:8000`. The frontend calls the API at `http://localhost:5000/api`.

Create an account through the application, then sign in. The backend stores registered accounts in MongoDB.

---

## ⚖️ Legal & Safety Guardrail Notice
Prototype pages may display AI-related labels, but the current API does not produce AI predictions or camera matches. AI data endpoints return `501 NOT_CONFIGURED`; no automated enforcement decision is made by the backend.
