# VIGILANT — One-Click Cloud Deployment Guide

This guide provides step-by-step instructions for deploying **VIGILANT — AI Smart Vehicle, Traffic & Citizen Management Platform** live to the web.

---

## 🚀 Option 1: Render.com Free Deployment (Recommended - 3 Minutes)

1. Push your `vigilant` project folder to GitHub.
2. Log in to [Render.com](https://render.com) and click **New +** → **Blueprint**.
3. Connect your GitHub repository. Render will automatically detect `render.yaml` and configure the build settings.
4. Click **Apply**. Your app will be live at `https://vigilant-platform.onrender.com`!

---

## 🐳 Option 2: Docker / Docker Compose Deployment

To deploy using Docker on any server or cloud VM:

```bash
cd vigilant

# Build and start container
docker-compose up -d --build
```
Your application will be live at `http://YOUR_SERVER_IP:5000`.

---

## ☁️ Option 3: AWS Cloud Deployment

1. Launch an **AWS EC2 Instance** (Ubuntu 22.04 LTS).
2. SSH into your instance and run:
   ```bash
   sudo apt update && sudo apt install docker.io docker-compose -y
   git clone <YOUR_REPOSITORY_URL>
   cd vigilant
   docker-compose up -d --build
   ```
3. Open port 5000 in your AWS EC2 Security Group.
