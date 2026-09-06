# User Management API

A simple REST API for managing users, built with Node.js and Express. This project was built and debugged with the help of GitHub Copilot.

## Features

- **CRUD endpoints**: GET, POST, PUT, DELETE for managing users
- **Validation middleware**: rejects malformed user data (missing name, invalid email, bad age)
- **Logging middleware**: logs every incoming request with a timestamp
- **Authentication middleware**: protects write operations (POST/PUT/DELETE) with an API key
- **Centralized error handling** and a 404 fallback route

## Project Structure
