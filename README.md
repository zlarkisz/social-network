# 🌐 Social Network API

## 📝 Description
The Social Network API is a backend application built with NestJS, designed to support user registration, post creation, and interactions between users. It leverages PostgreSQL for data storage, Redis for caching, and Docker for containerization. Swagger documentation is integrated to ensure easy API exploration.

---

## ✨ Features

### 👥 User Management
- User registration with hashed passwords (bcrypt).
- Secure JWT-based authentication with token expiration.

### 📝 Post Management
- Create posts associated with authorized users.
- Retrieve posts with caching implemented using Redis.

### ⚠️ Error Handling
- Proper error responses for unauthorized access (401) and missing parameters (403).

### 📖 Swagger Documentation
- API endpoints are documented and accessible via Swagger at `/api`.

### 🐳 Containerized Deployment
- Fully containerized application using Docker Compose.

### 🧪 Testing
- Unit and integration tests for CRUD operations, authentication, and caching.

---

## 🔧 Prerequisites
- **Node.js**: v16 or higher
- **pnpm**: v8 or higher
- **Docker**: Ensure Docker and Docker Compose are installed and running

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd social-network
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:
   ```env
   DB_HOST=db
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=admin
   DB_NAME=postgres
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

---

## 📚 API Documentation
Once the application is running, Swagger documentation is available at:
```
http://localhost:3000/api
```

### 📌 Endpoints
#### 🔐 Authentication
- `POST /auth/get-token`: Authenticate a user and retrieve a JWT token.

#### 👤 Users
- `POST /users`: Register a new user.
- `GET /users`: Retrieve a list of all users (protected).
- `GET /users/:id`: Retrieve details of a specific user (protected).

#### 📝 Posts
- `POST /posts`: Create a new post (protected).
- `GET /posts`: Retrieve all posts with caching (protected).
- `GET /posts/user/:userId`: Retrieve posts by a specific user ID (protected).

---

## 🧪 Testing
Run the tests to ensure the application is functioning correctly:
```bash
pnpm test
```
### 🧪 Tests include:
- Unit tests for authentication and CRUD operations.
- Integration tests for major API flows.

---

## 📁 Project Structure
```
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── posts/
├── app.module.ts
├── main.ts
├── guards/
├── interceptors/
├── decorators/
```

---

## 🛠️ Key Technologies
- **NestJS**: Backend framework
- **PostgreSQL**: Database
- **Redis**: Caching
- **Docker Compose**: Container orchestration
- **Swagger**: API documentation
- **Jest**: Testing framework

---

## 🚀 Future Improvements
- Add more robust role-based access control.
- Enhance test coverage with edge cases.
- Improve Redis caching strategies for specific user queries.