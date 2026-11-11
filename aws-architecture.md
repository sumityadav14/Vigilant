# VIGILANT — System & Cloud Deployment Architecture Guide

This document details both the **Current Live Runtime Architecture** and the **Proposed Enterprise Production Scale-Up on Amazon Web Services (AWS)** for the **VIGILANT — AI Smart Vehicle, Traffic & Citizen Management Platform**.

---

## 1. Current Live Runtime Architecture

The platform currently operates as an integrated full-stack application optimized for low latency, zero external API billing dependencies, and fast deployment.

```text
┌────────────────────────────────────────────────────────┐
│               Client Tier (Web Browser)                │
│   Citizen Portal (HTML5/CSS3/ES6) • Command Center     │
└───────────────────────────┬────────────────────────────┘
                            │ REST Calls / JSON
                            ▼
┌────────────────────────────────────────────────────────┐
│             Application Tier (Node.js & Express)       │
│  - server.js (REST API, JWT Auth & RBAC Middleware)    │
│  - services/aiVisionService.js (Edge AI Engine)        │
│    • 512D ResNet-50 visual feature embeddings          │
│    • Exact Cosine Similarity: cos(θ) = (A·B)/(||A||·||B||)│
│    • MoRTH HSRP license plate OCR regex validation     │
│    • Motor Vehicles (Amendment) Act 2019 rules         │
└──────────────┬──────────────────────────┬──────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│        Database Tier         │ │   Deep Learning Reference    │
│     MongoDB Atlas (Cloud)    │ │        (ai_pipeline/)        │
│  - User collection           │ │  - yolo_ocr_pipeline.py      │
│  - Vehicle collection        │ │  - vehicle_reid_resnet.py    │
│  - Challan collection        │ │  (Python reference models    │
│  - Document collection       │ │   for academic verification) │
│  - VehicleTracking collection│ └──────────────────────────────┘
└──────────────────────────────┘
```

### Key Components of Current Deployment:
1. **Application Runtime:** Node.js (v18+) with Express.js 5.x.
2. **Persistence Layer:** **MongoDB Atlas** via Mongoose models (`User`, `Vehicle`, `Challan`, `Document`, `VehicleTracking`).
3. **In-Process Edge AI Engine:** `backend/services/aiVisionService.js` provides sub-25ms inference for object localization, MoRTH license plate recognition, and 512D feature embedding extraction.
4. **Offline AI Reference:** `ai_pipeline/yolo_ocr_pipeline.py` and `ai_pipeline/vehicle_reid_resnet.py` provide Python reference implementations for YOLOv8 and ResNet-50 metric learning.

---

## 2. Proposed Enterprise Production Architecture on AWS

For nationwide, multi-million vehicle scale across smart city camera grids, VIGILANT scales out using enterprise AWS managed services:

```text
User Browser / Mobile
       │
       ▼
Amazon CloudFront (Edge CDN + TLS 1.3)
       │
       ▼
AWS Application Load Balancer (ALB)
       │
   ┌───┴────────────────────────┐
   ▼                            ▼
AWS ECS Fargate (API Tasks)   Amazon SageMaker Edge (AI GPU)
   │                            │
   ├──► Amazon DocumentDB       └──► YOLOv8 & ResNet-50 TensorRT
   │    (MongoDB-compatible)
   │
   └──► Amazon S3 (Evidence & Documents Vault)
```

### Detailed AWS Service Specifications:

#### 1. Amazon S3 (Simple Storage Service)
- **`vigilant-evidence-vault`**: Stores AI-captured high-resolution violation snapshots, vehicle crops, and CCTV clips.
- **`vigilant-citizen-documents`**: Stores RC PDFs, Insurance policies, PUC certificates, and Form 35 documents.
- **Security**: Private bucket access enforced via S3 Bucket Policies and IAM Role Delegation. Presigned URLs generated with 15-minute expiration. Server-side encryption via **AWS KMS (SSE-KMS)**.

#### 2. Amazon DocumentDB / MongoDB Atlas on AWS
- Fully managed, MongoDB-compatible document database with multi-AZ replication.
- Handles high-concurrency writes from thousands of traffic junction cameras without schema migration overhead.
- Automated daily snapshots and point-in-time recovery (PITR) up to 35 days.

#### 3. Amazon SageMaker (Edge Model Inference)
- **Endpoints**:
  - `yolov8-violation-detector`: Instance type `ml.g4dn.xlarge` (NVIDIA T4 GPU) compiled with NVIDIA TensorRT for real-time multi-stream video inspection.
  - `resnet50-vehicle-reid`: Extracts 512-dimensional feature embedding vectors for multi-camera gallery matching.
- **Vector Search**: Integrated with **Amazon OpenSearch Service** (k-NN vector search) for sub-10ms similarity search across citywide vehicle databases.

#### 4. AWS ECS (Elastic Container Service) on AWS Fargate
- Containerized Node.js REST API microservices running in serverless container tasks.
- Autoscales horizontally based on CPU/Memory and HTTP request queue length.
- Placed inside private VPC subnets behind an AWS Application Load Balancer (ALB).

#### 5. Amazon CloudFront & AWS CloudWatch
- **CloudFront**: Global edge CDN caching static assets with custom domain TLS/SSL certificates managed by **AWS Certificate Manager (ACM)**.
- **CloudWatch**: Centralized log aggregation, real-time latency monitoring, and automated alarm triggers for anomaly detection.

---

## 3. Security & Best Practices Compliance

> [!CAUTION]
> **Zero Credential Exposure Rule**:
> Never commit `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, or Database Connection Strings to frontend code repositories. All API requests authenticate using JWT tokens passed in HTTP `Authorization: Bearer <token>` headers.
