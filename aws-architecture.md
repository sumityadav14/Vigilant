# VIGILANT — AWS Production Cloud Architecture Guide

This document defines the production cloud architecture for deploying **VIGILANT — AI Smart Vehicle, Traffic & Citizen Management Platform** on Amazon Web Services (AWS).

---

## 1. System Cloud Architecture Overview

```text
User Browser / Mobile
       │
       ▼
Amazon CloudFront (CDN + SSL)
       │
       ▼
Frontend Static Assets (S3)
       │
       ▼
AWS API Gateway (REST API Router)
       │
   ┌───┴────────────────────────┐
   ▼                            ▼
AWS Lambda / ECS (API)   Amazon SageMaker (AI Models)
   │                            │
   ├──► Amazon RDS (PostgreSQL)  └──► YOLOv8 & ResNet-50 PyTorch
   │
   └──► Amazon S3 (Evidence & Documents Vault)
```

---

## 2. Detailed AWS Service Specifications

### 1. Amazon S3 (Simple Storage Service)
Used for durable object storage of evidence photos, document PDFs, and video clips.

- **`vigilant-evidence-vault`**: Stores AI captured violation snapshots and camera clips.
- **`vigilant-citizen-documents`**: Stores RC PDFs, Insurance policies, PUC certificates, and HPA NOC documents.
- **Security**: Private bucket access enforced via S3 Bucket Policies and IAM Role Delegation. Presigned URLs generated for temporary secure access (15-minute expiry). Encryption at rest using **AWS KMS (SSE-KMS)**.

---

### 2. Amazon RDS (Relational Database Service)
Managed relational database hosting the 17 production database tables (`users`, `vehicles`, `challans`, `camera_locations`, `stolen_vehicle_reports`, `vehicle_reidentification`, `audit_logs`).

- **Engine**: PostgreSQL 15.x Multi-AZ Deployment (Primary + Standby replica for high availability).
- **Storage**: GP3 Auto-scaling storage with automated daily snapshots and 30-day point-in-time recovery (PITR).
- **Security**: Placed inside private database subnets with security groups restricting access strictly to Lambda/ECS backend instances.

---

### 3. Amazon SageMaker (AI Model Inference)
Runs deep learning model inference endpoints for real-time computer vision processing.

- **Endpoints**:
  - `yolov8-violation-detector`: Instance type `ml.g4dn.xlarge` (NVIDIA T4 GPU) running object detection for Red Light, Helmet, and Speeding infractions.
  - `resnet50-vehicle-reid`: Visual feature extractor outputting 512-dimensional vector embeddings.
- **Vector Search**: Integrated with **Amazon OpenSearch Service** (k-NN vector search) or FAISS for multi-camera similarity matching.

---

### 4. AWS Lambda & Amazon API Gateway
Serverless backend API microservices delivering sub-100ms response times.

- **Routes**:
  - `POST /api/auth/login`
  - `GET /api/vehicles`
  - `POST /api/challans/{id}/review`
  - `POST /api/stolen/report`
  - `POST /api/vehicle-reid`
- **Environment**: Node.js 18.x runtime with environment variables injected securely via **AWS Secrets Manager**.

---

### 5. Amazon CloudFront & CloudWatch
- **CloudFront**: Global edge network delivering frontend assets with custom domain TLS/SSL certificate managed by **AWS Certificate Manager (ACM)**.
- **CloudWatch**: Centralized log aggregation for API Gateway, Lambda execution logs, and SageMaker model latency telemetry. Alert alarms configured for error rate spikes (>1%).

---

## 3. Security & Best Practices Compliance

> [!CAUTION]
> **Zero Credential Exposure Rule**:
> Never commit `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, or Database Passwords to frontend code repositories. All API requests authenticate using JWT tokens passed in HTTP Authorization Bearer headers.
