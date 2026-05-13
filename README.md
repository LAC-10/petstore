# Petstore

## Overview
This project contains a Spring Boot backend and a React + Vite frontend for a pet e-commerce site.

## Backend
Location: `backend`

Requirements:
- Java 17+
- PostgreSQL

Run:
1. Create a PostgreSQL database named `petstore`.
2. Update credentials in `backend/src/main/resources/application.properties` if needed.
3. Start backend:
```bash
cd petstore/backend
mvn spring-boot:run
```

API endpoints are available at `http://localhost:8080/api/pets`.

## Frontend
Location: `frontend`

Run:
```bash
cd petstore/frontend
npm install
npm run dev
```

Open the frontend at `http://localhost:5173`.
