# VIGILANT — AI Smart Vehicle, Traffic & Citizen Management Platform
**B.Tech CSE (Artificial Intelligence) Major Project**

---

## 🌟 Executive Project Overview

**VIGILANT** is an Intelligent Traffic Management System (ITMS) and Citizen Vehicle Services Platform designed to bridge the gap between traffic enforcement command centers and vehicle owners. 

The platform implements a **dual-tier AI and system architecture**:
1. **Production Full-Stack Runtime (Node.js + Express + MongoDB Atlas)**: A high-performance REST API backend with native in-process computer vision perception (`backend/services/aiVisionService.js`), 512-dimensional visual feature extraction, exact cosine metric computation, and persistent storage using Mongoose models (`User`, `Vehicle`, `Challan`, `Document`, `VehicleTracking`).
2. **Deep Learning Reference Pipelines (`ai_pipeline/`)**: Comprehensive Python implementations for academic research and edge deployment:
   - `ai_pipeline/yolo_ocr_pipeline.py`: YOLOv8 multi-class vehicle localization, HSRP plate candidate extraction, MoRTH Indian plate regex validation, and statutory infraction rule evaluation.
   - `ai_pipeline/vehicle_reid_resnet.py`: ResNet-50 visual metric learning generating 512-dimensional L2-normalized float32 embedding vectors with cross-camera cosine distance ranking:
     $$\text{Cosine}(A, B) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$

---

## 📂 Complete Project Structure

```text
vigilant/
├── index.html                     # Platform Landing Page (Hero, Stats Ticker, Feature Grid)
├── login.html                     # Dual-Role Login (Citizen & Authority Portal Toggle)
├── register.html                  # Role-Based User Registration (Citizen & Authority)
│
├── citizen/                       # Citizen Services Suite (10 Pages)
│   ├── dashboard.html             # Main Citizen Portal Overview
│   ├── my-vehicles.html           # Registered Vehicles Grid & Add Vehicle Modal
│   ├── vehicle-details.html       # Vehicle Technical Specs, RC, Insurance, PUC & HPA Sub-tabs
│   ├── challan-list.html          # Filterable Traffic Challans Data Table & Online Payment
│   ├── challan-details.html       # AI Violation Snapshot Evidence Inspection Frame
│   ├── dispute-review.html        # Formal Challan Dispute Submission Form & Review State
│   ├── document-vault.html        # Centralized RC, Insurance, and PUC Vault (7-Day Warning)
│   ├── hypothecation-assistant.html # Guided 5-Step HPA Removal Progress Tracker & Form 35
│   ├── stolen-report.html         # 🚨 Emergency Stolen Vehicle Report Form & FIR Upload
│   └── notifications-center.html  # Notification Stream & Document Expiry Reminders Hub
│
├── authority/                     # Police Command Center Suite (12 Pages)
│   ├── dashboard.html             # Traffic Command Center Dashboard & Live Telemetry
│   ├── cameras.html               # 24/7 CCTV Live Surveillance Grid & Multi-Angle Streams
│   ├── violations.html            # AI Traffic Violation Detector & Bounding Box Inspector
│   ├── yolo-ocr-demo.html         # YOLOv8 & OCR Pipeline Studio (Video & Image Inference)
│   ├── vehicle-reid.html          # AI Vehicle Re-ID Search (512D Embeddings & Match Timeline)
│   ├── tracking.html              # Leaflet.js Interactive Multi-Camera Spatial GIS Route Map
│   ├── stolen-search.html         # AI Stolen Vehicle Search Network & Police Hotlist
│   ├── ai-models.html             # AI Pipeline Inspector & Threshold Simulator
│   ├── analytics.html             # Chart.js Analytics Center (4 Interactive Visualizations)
│   ├── maps.html                  # Full-screen Google / OSM GIS Interactive Map
│   ├── reports.html               # Traffic & Enforcement Report Generator (CSV/PDF)
│   └── profile.html               # Traffic Officer Profile & Badge Credentials
│
├── ai_pipeline/                   # Deep Learning Research & Edge Pipelines (Python)
│   ├── yolo_ocr_pipeline.py       # YOLOv8 Localization, HSRP OCR & Rule Engine
│   └── vehicle_reid_resnet.py     # ResNet-50 512D Feature Extraction & Cosine Similarity
│
├── backend/                       # Express REST API & Database Layer (Node.js)
│   ├── server.js                  # Main Express Server & REST Endpoints
│   ├── models/                    # Mongoose Models (User, Vehicle, Challan, Document, Tracking)
│   ├── services/
│   │   ├── aiVisionService.js     # Native 512D Feature Extraction, Cosine Re-ID & ANPR
│   │   ├── vehicleLookupService.js# Vahan / Parivahan RTO Registry Lookup
│   │   └── apiSathiService.js     # Live E-Challan Integration Service
│   └── data/
│       └── mockVehicles.js        # Seed ITMS Targets & CCTV Telemetry Records
│
├── css/                           # Modular CSS Design System
│   ├── global.css                 # Design Tokens, Midnight Dark Palette, Glassmorphism
│   ├── components.css             # Buttons, Forms, Dark Tables, Modals, Badges & Toasts
│   ├── dashboard.css              # Sidebar Layout, Top Header, Camera Grid & Ticker
│   └── responsive.css             # Mobile & Tablet Responsive Styles
│
├── js/                            # Core Client Engines
│   ├── auth.js                    # Session & Role Engine (Citizen / Authority RBAC)
│   ├── app.js                     # Main UI Controllers, Modals, Toasts & Event Handlers
│   ├── yolo-ocr.js                # Dynamic YOLOv8 & OCR Perception Controller
│   ├── api.js                     # REST API Service Client (Fetch Wrappers)
│   └── ai-chat.js                 # Conversational AI Assistant (Trained Knowledge Base)
│
├── aws-architecture.md            # Production AWS Cloud Deployment Architecture Specification
└── PROJECT_DEFENSE_GUIDE.md       # Academic Defense Guide, 15-Slide Deck & 15 Viva Q&As
```

---

## 🛠️ Technology Stack Breakdown

| Layer | Technologies Used | Description |
| :--- | :--- | :--- |
| **Frontend UI/UX** | HTML5, CSS3 (Glassmorphism Dark Theme), Vanilla ES6+ | Zero heavy framework dependencies, sub-50ms render latency |
| **Edge AI Perception** | `backend/services/aiVisionService.js` | In-process 512D visual feature extraction, exact cosine similarity, and MoRTH regex ANPR |
| **Deep Learning Reference** | `ai_pipeline/*.py` (YOLOv8 + ResNet-50) | Complete Python metric learning and computer vision pipeline for academic review |
| **REST API Layer** | Node.js, Express.js (`backend/server.js`) | RESTful endpoints for auth, vehicles, challans, Re-ID, detection, and surveillance |
| **Database** | MongoDB Atlas via Mongoose | Scalable document store for users, vehicle specifications, challan records, and tracking logs |
| **Spatial GIS Mapping** | Leaflet.js, OpenStreetMap, CartoDB Dark | Real-time multi-camera corridor tracking and CCTV camera pins |
| **Data Analytics** | Chart.js | Hourly violation trends, speed distribution, camera hotspots, and recovery stats |
| **Icons & Visuals** | Lucide Icons CDN | Modern vectorized UI glyphs |

---

## 🧠 AI Perception & Statutory Rules Engine

VIGILANT strictly implements statutory rules codified under the **Motor Vehicles (Amendment) Act, 2019**:

1. **Corridor Over-Speeding (Section 183(1))**:
   - Compared against corridor-specific radar speed limit (e.g. 50 km/h).
   - Compounding fine: ₹2,000 (Light Motor Vehicles).
2. **Protective Headgear / Helmet Infraction (Section 129 / CMVR Rule 138)**:
   - Evaluated **strictly on Two-Wheelers** (Motorcycles, Scooters).
   - **Statutory Guardrail**: Cars, Sedans, and SUVs **never** receive Section 129 helmet challans. Compounding fine: ₹1,000.
3. **Red Light Stop-Line Breach (Section 119 / 184)**:
   - Detects virtual stop-line breach during junction RED signal phase. Compounding fine: ₹5,000.
4. **Emergency Vehicle Priority Exemption (Section 194E)**:
   - Ambulances and Fire Engines with active emergency beacons receive **100% Zero-Challan Statutory Exemption** (₹0 fine).
5. **Vehicle Re-Identification (Re-ID)**:
   - Extracts 512-dimensional float32 L2-normalized feature vectors representing spatial chromatic profiles and structural edge gradients.
   - Computes exact Cosine Similarity across multi-camera junction sightings to track vehicle trajectory corridors even if number plates are obscured.

---

## ⚡ How to Run & Demonstrate the Project

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas connection string (or local MongoDB)

### Step 1: Install Dependencies
```powershell
cd backend
npm.cmd install
```

### Step 2: Configure Environment Variables
Verify or create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/vigilant?retryWrites=true&w=majority
JWT_SECRET=vigilant_secure_jwt_token_key_2026
```

### Step 3: Start the Backend Server
```powershell
node server.js
```
The server serves both the REST API at `http://localhost:5000/api` and the static frontend directly from the project root at `http://localhost:5000`.

### Step 4: Open the Platform
Visit `http://localhost:5000` in your web browser:
- **Authority Portal**: Sign in as `officer@police.gov.in` (Password: any 6+ chars or registered password) to access the Command Center.
- **Citizen Portal**: Sign in as `citizen@example.com` or register a new citizen account to inspect vehicles and e-challans.

---

## ⚖️ Legal & Court Admissibility Guardrails

- **Section 65B Indian Evidence Act**: Every automated AI detection records cryptographic hash receipts, high-resolution evidence snapshots, GPS camera identifiers, and timestamp metadata.
- **Dual-Layer Explainable AI (XAI)**: Bounding box overlays and textual attribution reasons accompany every issued challan to ensure constitutional due process before compounding fines are enforced.
