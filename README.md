# VIGILANT — AI Smart Vehicle, Traffic & Citizen Management Platform
**B.Tech CSE (Artificial Intelligence) Major Project**

---

## 🌟 Executive Project Overview

**VIGILANT** is a unified, next-generation Smart City platform designed to integrate computer vision artificial intelligence with traffic law enforcement and citizen vehicle management.

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
│   ├── mock-data.js             # Fictional Demo Datasets (Vehicles, Challans, Cameras, Violations)
│   ├── auth.js                  # Session & Role Engine (localStorage State Control)
│   ├── app.js                   # Main UI Controllers, Modals, Toasts, Chart.js & Maps
│   ├── ai-sim.js                # AI Simulation Engine (Confidence Slider & Vector Math)
│   ├── api.js                   # REST API Service Abstraction (Fetch Client Wrappers)
│   └── ai-chat.js               # Conversational AI Assistant Engine (Trained Knowledge Base)
│
├── backend/                     # Backend & Database Architecture
│   ├── server.js                # Express.js Node Backend REST API Server Blueprint
│   └── schema.sql               # Production SQL Relational Database Schema (17 Tables)
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
| **AI Computer Vision** | YOLOv8 Object Detection, ResNet-50 512D Visual Re-ID Embeddings |
| **REST API Layer** | Fetch API Service Client (`js/api.js`) |
| **Backend Server** | Node.js, Express.js REST API Server (`backend/server.js`) |
| **Database** | Relational SQL Schema (`backend/schema.sql`) for PostgreSQL / MySQL |
| **Cloud Production** | AWS Plan (S3, RDS PostgreSQL Multi-AZ, SageMaker, CloudFront) |

---

## ⚡ How to Run & Demonstrate the Project

### Option 1: Direct Web Browser Access (Easiest)
1. Open Windows File Explorer and navigate to `C:\Users\Sumit yadav\Desktop\vigilant`.
2. Double-click [index.html](file:///C:/Users/Sumit%20yadav/Desktop/vigilant/index.html) to launch in Chrome or Edge.

### Option 2: Live Local Web Server (Recommended)
Open PowerShell or Command Prompt:
```powershell
cd "C:\Users\Sumit yadav\Desktop\vigilant"
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

---

## 🔑 Demo Account Credentials

- **Citizen Portal**: `citizen@demo.com` (Password: `demo123`)
- **Authority Command Center**: `authority@demo.com` (Badge: `POL-DEL-4092`)

---

## ⚖️ Legal & Safety Guardrail Notice
All AI predictions are explicitly labeled: **"Possible AI Match — Human Verification Required"**. Autonomous AI detections assist police officers but do not trigger automated legal penalties without human officer verification.
