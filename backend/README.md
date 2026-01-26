# Backend 

Express API server for the Product Management System.

This folder contains:
    authentication APIs
    product APIs
    cart logic
    role-based authorization

## Run
cd backend
npm install
npm run dev

## Test Endpoints
health check:
GET http://localhost:4000/api/health

Domain:
GET http://localhost:4000/api/auth
GET http://localhost:4000/api/products

## Expected Error Handling
GET http://localhost:4000/api/unknown


## Auth APIs
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgotpassword

### Example Requests
Signup:
{ "email": "shanshanma@domain.com", "password": "123456!" }

Login:
{ "email": "shanshanma@domain.com", "password": "123456!" }