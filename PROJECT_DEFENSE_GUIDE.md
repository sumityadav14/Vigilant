# VIGILANT — Major Project Defense & Viva Preparation Guide
**B.Tech CSE (Artificial Intelligence) Major / Final Year Project**

---

## 1. Executive Summary & Abstract

**Project Title:** VIGILANT — AI Smart Vehicle, Traffic & Citizen Management Platform  
**Domain:** Artificial Intelligence, Computer Vision, Smart City IoT, Full-Stack SaaS  

### Abstract:
Urban traffic management faces critical challenges due to increasing vehicle density, manual violation detection inefficiencies, delayed stolen vehicle tracking, and fragmented citizen vehicle services. **VIGILANT** is a unified Smart City platform designed to bridge the gap between traffic law enforcement and citizen services.

The project contains a browser frontend, an Express REST API, and experimental computer-vision pipeline code. The live API uses MongoDB through Mongoose for authentication and user, vehicle, challan, and document records. Camera telemetry, violations, analytics, stolen-vehicle search, and vehicle Re-ID are not connected to MongoDB; their API endpoints return `501 NOT_CONFIGURED` rather than simulated results.

---

## 2. Recommended 15-Slide Presentation Deck Structure

| Slide # | Slide Title | Key Content to Present |
| :--- | :--- | :--- |
| **Slide 1** | Title Slide | Project Name: VIGILANT, Student Name, Roll No, Department of CSE (AI), Guide Name |
| **Slide 2** | Problem Statement | Urban congestion, manual traffic enforcement bottlenecks, license plate tampering, delayed stolen vehicle tracking |
| **Slide 3** | Proposed Solution | Unified AI Smart City Platform combining Citizen Vault & Police Command Center |
| **Slide 4** | System Architecture | Diagram: Frontend UI → REST API Layer → Express Server → MongoDB via Mongoose models |
| **Slide 5** | AI Computer Vision Prototype | Experimental YOLOv8 and vehicle Re-ID pipeline code; not connected to live API routes |
| **Slide 6** | Citizen Module Features | RC/Insurance/PUC Document Vault, 7-Day Expiry Warnings, Hypothecation Removal Assistant |
| **Slide 7** | Challan Management | MongoDB-backed challan listing and payment; review submission is not implemented in the API |
| **Slide 8** | Authority UI Prototype | Camera, violation, and analytics views; corresponding API data is not configured |
| **Slide 9** | Spatial GIS Tracking Prototype | Leaflet.js map UI; live tracking data is not configured in the API |
| **Slide 10** | Stolen Vehicle Search Prototype | Search API reports `NOT_CONFIGURED`; no camera matches are returned |
| **Slide 11** | Legal & Safety Guardrails | Prototype UI labels indicate human review; the current backend does not produce AI match results |
| **Slide 12** | Database Design | MongoDB records accessed through Mongoose `User`, `Vehicle`, `Challan`, and `Document` models |
| **Slide 13** | Cloud Architecture | Production AWS Plan: S3 Buckets, RDS PostgreSQL Multi-AZ, SageMaker GPU Endpoints |
| **Slide 14** | Performance & Results | No reproducible end-to-end performance benchmarks are currently verified |
| **Slide 15** | Conclusion & Q&A | Project Summary, Future Enhancements (5G Edge AI), Thank You & Open for Q&A |

---

## 3. Live 5-Minute Project Presentation Script

Use an account registered through the MongoDB-backed API. Do not present prototype data as live backend results:

1. **Step 1 (Introduction & Citizen Login):**  
   *"Respected Examiners, I present VIGILANT. The Express API uses MongoDB for implemented account and vehicle workflows. I will sign in using an account registered through this backend."*
2. **Step 2 (Citizen Dashboard & Document Health):**  
   *"The citizen vehicle and challan views load records from MongoDB. Empty collections are shown as empty; the application does not substitute sample records."*
3. **Step 3 (Challan Evidence & Dispute Submission):**  
   *"Challans can be listed and payment status can be updated through the MongoDB-backed API. Challan evidence and review submission are not currently implemented by the backend."*
4. **Step 4 (Authority Command Center):**  
   *"Authority camera, violation, and analytics endpoints currently return `501 NOT_CONFIGURED`; there is no live camera feed or dispute-review workflow connected to the backend."*
5. **Step 5 (Vehicle Re-ID & Multi-Camera Route Map):**  
   *"The Re-ID and tracking pages are interface prototypes. The Re-ID endpoint returns `501 NOT_CONFIGURED` with no matches, and live route data is not available."*
6. **Step 6 (Stolen Vehicle Search & Legal Guardrail):**  
   *"Stolen vehicle search is not connected to a MongoDB model or camera service. Its API returns `501 NOT_CONFIGURED`; no match or similarity score is fabricated."*

---

## 4. Top 15 Expected Viva Voce Questions & Answers

### Q1: What is the core objective of the VIGILANT project?
**Answer:** VIGILANT is a Smart City project prototype. Its current MongoDB-backed API supports authentication, vehicle records, challan listing/payment, and document listing. Camera/AI monitoring, stolen-vehicle search, and challan review are not connected to live backend data.

### Q2: How does Vehicle Re-Identification (Re-ID) differ from License Plate Recognition (ANPR)?
**Answer:** ANPR reads text from a license plate, while vehicle Re-ID attempts to compare visual vehicle features. The repository contains prototype UI/pipeline code, but Re-ID matching is not implemented in the live API and currently returns `NOT_CONFIGURED`.

### Q3: Why is human verification mandatory for AI detections in your system?
**Answer:** The interface labels AI detections as requiring human review. The current API does not run camera detection or issue AI-generated challans, so it does not make automated enforcement decisions.

### Q4: Which AI models and frameworks are used?
**Answer:** The repository includes experimental YOLO/OCR pipeline code. A trained Re-ID model, FAISS index, and live inference integration are not verified as part of the current API; no model performance or match results should be claimed.

### Q5: How is the frontend connected to the backend REST API?
**Answer:** The frontend uses an API abstraction client (`js/api.js`) implementing asynchronous `fetch()` calls to REST endpoints (e.g., `POST /api/auth/login`, `GET /api/vehicles`, `POST /api/challans/:id/review`). If the backend server is offline, it gracefully falls back to mock telemetry handlers to ensure zero UI crashes.

### Q6: Explain the database design and schema structure.
**Answer:** The current API stores data in MongoDB through Mongoose models for `User`, `Vehicle`, `Challan`, and `Document`. The checked-in SQL schema is a legacy reference and is not used by the running API. Camera, stolen-vehicle, violations, analytics, and Re-ID data models are not currently implemented.

### Q7: How does the multi-camera tracking map work?
**Answer:** The tracking page contains a Leaflet.js interface prototype. The backend has no tracking endpoint or MongoDB tracking model, so it does not show live detection coordinates or real vehicle trajectories.

### Q8: What security measures are implemented in the project?
**Answer:**
- **Zero Credential Exposure:** AWS secret keys and DB passwords are kept strictly out of frontend code.
- **Role-Based Access Control (RBAC):** Access control check (`AuthEngine.checkAccessControl`) isolates Citizen routes from Authority Command Center features.
- **Data Protection:** Presigned S3 URLs with short expiration periods for document access and SSE-KMS encryption at rest.

### Q9: How are expiring vehicle documents handled?
**Answer:** The document view can display expiry information present in document records. The backend currently lists documents only; automated push notifications are not implemented by the API.

### Q10: What is the function of the Hypothecation Assistant?
**Answer:** Removing a paid-off loan endorsement generally involves the relevant RTO process and Form 35. VIGILANT's Hypothecation Assistant is a frontend prototype and is not backed by a MongoDB model or API route.

### Q11: What performance metrics were achieved by the AI pipeline?
**Answer:** No reproducible end-to-end benchmark results are currently verified. Performance metrics should only be reported after documenting the hardware, test set, and measurement procedure.

### Q12: How would you deploy this platform to AWS in production?
**Answer:** The AWS architecture is a proposal, not the current deployment. The running API uses MongoDB through Mongoose; the proposal's PostgreSQL target would require a persistence-layer migration before deployment.

### Q13: How does the system handle high traffic camera data streams?
**Answer:** Edge processing and camera streaming are proposed concepts, not implemented in this backend. The API does not ingest camera feeds or MQTT/Kafka events.

### Q14: What occurs when a citizen reports a stolen vehicle?
**Answer:** The stolen vehicle reporting and search pages are prototypes. The backend returns `501 NOT_CONFIGURED`; it does not create reports, generate reference IDs, or search camera data.

### Q15: What are the future enhancements for this project?
**Answer:** Future scope includes integrating **5G Edge AI micro-nodes**, automated license plate OCR for night vision IR cameras, integration with national Parivahan APIs, and generative AI conversational assistants for citizen legal queries.
