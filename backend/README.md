# Backend 

Express API server for the Product Management System.

This folder contains:
    authentication APIs
    product APIs
    cart logic
    role-based authorization

## Run
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