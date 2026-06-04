# FridgeTracker

## Project Overview

FridgeTracker is a **full-stack inventory management system** built with **Node.js, Express.js, PostgreSQL, and EJS**.

The application allows users to manage fridge inventory, track products, create orders, monitor stock levels, and receive alerts when items become low in quantity.

The project follows a **layered architecture** that separates business logic, data access, validation, and presentation layers, making the application maintainable and scalable.

---

## Key Features

### Inventory Management

* Add products to the fridge
* Update product quantities
* Remove products from inventory
* View all stored items
* Monitor available stock levels

---

### Product Management

* Create new products
* Edit existing products
* Delete products
* View product information
* Store pricing and inventory details

---

### Order Management

* Create orders
* Track order history
* Manage order items
* View order details
* Associate products with orders

---

### Alert System

* Generate inventory alerts
* Detect low-stock products
* Monitor inventory status
* View active alerts

---

### User Management

* User registration
* User authentication
* Profile management
* User information validation

---

## System Architecture

The application follows a layered architecture pattern:

```text
Client Views (EJS)
        │
        ▼
   Controllers
        │
        ▼
    Services
        │
        ▼
 Repositories
        │
        ▼
 PostgreSQL Database
```

---

## Core Components

### Controllers

Handle HTTP requests and responses.

Examples:

* UserController
* ProductsController
* FridgeController
* OrdersController
* AlertsController
* OrderItemsController

Responsibilities:

* Receive requests
* Validate input
* Call service methods
* Return responses

---

### Services

Contain business logic and application rules.

Examples:

* UserService
* ProductsService
* FridgeService
* OrdersService
* AlertsService

Responsibilities:

* Process business operations
* Coordinate data flow
* Implement application logic

---

### Repositories

Handle database access and queries.

Examples:

* UserRepository
* ProductsRepository
* FridgeRepository
* OrdersRepository
* AlertsRepository

Responsibilities:

* Execute SQL queries
* Communicate with PostgreSQL
* Return database results

---

### Validators

Ensure incoming data is valid before processing.

Examples:

* User Validators
* Product Validators
* Fridge Validators
* Order Validators
* Alert Validators

---

### DTOs (Data Transfer Objects)

Used to transfer structured data between layers.

Examples:

* UserDTO
* ProductsDTO
* OrdersDTO
* FridgeDTO
* AlertDTO

---

## Technologies Used

### Backend

* Node.js
* Express.js
* PostgreSQL
* Express Validator
* CORS
* Dotenv

### Frontend

* EJS Templates
* HTML
* CSS

### Development Tools

* Nodemon
* Git
* GitHub

---

## API Endpoints

### Users

```text
GET    /api/user
GET    /api/user/:id
POST   /api/user
PUT    /api/user/:id
DELETE /api/user/:id
```

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Fridge Inventory

```text
GET    /api/fridges
GET    /api/fridges/:id
POST   /api/fridges
PUT    /api/fridges/:id
DELETE /api/fridges/:id
```

### Orders

```text
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id
DELETE /api/orders/:id
```

### Alerts

```text
GET    /api/alerts
GET    /api/alerts/:id
POST   /api/alerts
PUT    /api/alerts/:id
DELETE /api/alerts/:id
```

---

## File Structure

```text
FridgeTracker/
│
├── database/
│   └── schema.sql
│
├── css/
│   └── style.css
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── validators/
│   ├── middlewares/
│   ├── domain/
│   │   ├── entities/
│   │   ├── dto/
│   │   └── repositories/
│   ├── views/
│   ├── config/
│   ├── app.js
│   └── server.js
│
├── API_DOCUMENTATION.md
├── package.json
└── README.md
```

---

## How to Run

### Clone the Repository

```bash
git clone <repository-url>
cd FridgeTracker
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=4000
NODE_ENV=development

PGHOST=localhost
PGPORT=5432
PGDATABASE=fridgeTracker
PGUSER=your_username
PGPASSWORD=your_password
```

### Create Database

Run the SQL script found in:

```text
database/schema.sql
```

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

---

## Concepts Demonstrated

* RESTful API Design
* Layered Architecture
* Repository Pattern
* Service Layer Pattern
* MVC Principles
* Data Validation
* PostgreSQL Integration
* Server-Side Rendering
* CRUD Operations
* Environment Configuration
* Error Handling
* Software Engineering Best Practices

---

## Authors

Joudy Bernard
