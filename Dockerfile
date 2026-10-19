# VIGILANT - Multi-Stage Production Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package definition and install production dependencies
COPY backend/package.json ./backend/
WORKDIR /app/backend
RUN npm install --production

# Copy complete application code
WORKDIR /app
COPY . .

EXPOSE 5000

CMD ["node", "backend/server.js"]
