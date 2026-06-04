# FridgeTracker API Documentation

## Table of Contents
1. [Overview](#overview)
2. [User API](#user-api)
3. [Products API](#products-api)
4. [Fridge API](#fridge-api)
5. [Orders API](#orders-api)
6. [Order Items API](#order-items-api)
7. [Alerts API](#alerts-api)
8. [Service Layer Methods](#service-layer-methods)
9. [Repository Layer Methods](#repository-layer-methods)

---

## Overview

FridgeTracker is a full-stack application for managing fridge inventory, tracking products, managing orders, and receiving alerts for low stock. The API follows a layered architecture with Controllers, Services, and Repositories.

**Base URL**: `http://localhost:4000`

**API Prefix**: `/api`

---

## User API

### Endpoints

#### `GET /api/user`
Lists all users.

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "city": "New York"
  }
]
```

#### `GET /api/user/:id`
Retrieves a single user by ID.

**Parameters**:
- `id` (number, required): User ID

**Response**: `200 OK`
```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "city": "New York"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid ID format
- `404 Not Found`: User not found

#### `POST /api/user`
Creates a new user.

**Request Body**:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "city": "New York",
  "password": "password123"
}
```

**Response**: `201 Created`
```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "city": "New York"
}
```

**Error Responses**:
- `400 Bad Request`: Missing required fields or validation errors

#### `PUT /api/user/:id`
Updates an existing user.

**Parameters**:
- `id` (number, required): User ID

**Request Body**:
```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@example.com",
  "city": "Los Angeles"
}
```

**Response**: `201 Created`
```json
{
  "id": 1,
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@example.com",
  "city": "Los Angeles"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid ID or validation errors
- `404 Not Found`: User not found

#### `DELETE /api/user/:id`
Deletes a user by ID.

**Parameters**:
- `id` (number, required): User ID

**Response**: `204 No Content`

**Error Responses**:
- `400 Bad Request`: Invalid ID format
- `404 Not Found`: User not found

---

## Products API

### Endpoints

#### `GET /api/products`
Lists all products.

**Response**: `200 OK`
```json
[
  {
    "prod_id": 1,
    "prod_name": "Milk",
    "prod_price": 3.99
  }
]
```

#### `GET /api/products/:id`
Retrieves a single product by ID.

**Parameters**:
- `id` (number, required): Product ID

**Response**: `200 OK`
```json
{
  "prod_id": 1,
  "prod_name": "Milk",
  "prod_price": 3.99
}
```

**Error Responses**:
- `400 Bad Request`: Invalid ID format
- `404 Not Found`: Product not found

#### `POST /api/products`
Creates a new product.

**Request Body**:
```json
{
  "prod_name": "Milk",
  "prod_price": 3.99
}
```

**Response**: `201 Created`
```json
{
  "prod_id": 1,
  "prod_name": "Milk",
  "prod_price": 3.99
}
```

**Error Responses**:
- `400 Bad Request`: Missing required fields or validation errors

#### `PUT /api/products/:id`
Updates an existing product.

**Parameters**:
- `id` (number, required): Product ID

**Request Body**:
```json
{
  "prod_name": "Organic Milk",
  "prod_price": 4.99
}
```

**Response**: `201 Created`
```json
{
  "prod_id": 1,
  "prod_name": "Organic Milk",
  "prod_price": 4.99
}
```

**Error Responses**:
- `400 Bad Request`: Invalid ID or validation errors
- `404 Not Found`: Product not found

#### `DELETE /api/products/:id`
Deletes a product by ID.

**Parameters**:
- `id` (number, required): Product ID

**Response**: `204 No Content`

**Error Responses**:
- `400 Bad Request`: Invalid ID format
- `404 Not Found`: Product not found

---

## Fridge API

### Endpoints

#### `GET /api/fridges`
Lists all fridges.

**Response**: `200 OK`
```json
[
  {
    "f_id": 1,
    "f_name": "Main Fridge",
    "location": "Kitchen",
    "restock_limit": 5
  }
]
```

#### `GET /api/fridges/fridge-details`
Lists all fridges with product and user details.

**Response**: `200 OK`
```json
[
  {
    "f_id": 1,
    "f_name": "Main Fridge",
    "location": "Kitchen",
    "restock_limit": 5,
    "prod_id": 1,
    "prod_name": "Milk",
    "quantity": 3,
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe"
  }
]
```

#### `GET /api/fridges/:id`
Retrieves a single fridge by ID.

**Parameters**:
- `id` (number, required): Fridge ID

**Response**: `200 OK`
```json
{
  "f_id": 1,
  "f_name": "Main Fridge",
  "location": "Kitchen",
  "restock_limit": 5
}
```

**Error Responses**:
- `400 Bad Request`: Invalid ID format
- `404 Not Found`: Fridge not found

#### `POST /api/fridges`
Creates a new fridge.

**Request Body**:
```json
{
  "f_name": "Main Fridge",
  "location": "Kitchen",
  "restock_limit": 5
}
```

**Response**: `201 Created`
```json
{
  "f_id": 1,
  "f_name": "Main Fridge",
  "location": "Kitchen",
  "restock_limit": 5
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors

#### `PUT /api/fridges/:id`
Updates an existing fridge.

**Parameters**:
- `id` (number, required): Fridge ID

**Request Body**:
```json
{
  "f_name": "Updated Fridge",
  "location": "Garage",
  "restock_limit": 10
}
```

**Response**: `201 Created`
```json
{
  "f_id": 1,
  "f_name": "Updated Fridge",
  "location": "Garage",
  "restock_limit": 10
}
```

**Error Responses**:
- `400 Bad Request`: Invalid ID or validation errors
- `404 Not Found`: Fridge not found

#### `DELETE /api/fridges/:id`
Deletes a fridge by ID.

**Parameters**:
- `id` (number, required): Fridge ID

**Response**: `204 No Content`

**Error Responses**:
- `400 Bad Request`: Invalid ID format
- `404 Not Found`: Fridge not found

---

## Orders API

### Endpoints

#### `GET /api/orders`
Lists all orders.

**Response**: `200 OK`
```json
[
  {
    "order_no": 1,
    "user_id": 1,
    "status": "pending",
    "date": "2024-01-15"
  }
]
```

#### `GET /api/orders/order-details`
Lists all orders with product and user details.

**Response**: `200 OK`
```json
[
  {
    "order_no": 1,
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "status": "pending",
    "date": "2024-01-15",
    "total_price": 25.99
  }
]
```

#### `GET /api/orders/:id`
Retrieves a single order by order number.

**Parameters**:
- `id` (number, required): Order number

**Response**: `200 OK`
```json
{
  "order_no": 1,
  "user_id": 1,
  "status": "pending",
  "date": "2024-01-15"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid order number format
- `404 Not Found`: Order not found

#### `POST /api/orders`
Creates a new order.

**Request Body**:
```json
{
  "user_id": 1,
  "status": "pending"
}
```

**Response**: `201 Created`
```json
{
  "order_no": 1,
  "user_id": 1,
  "status": "pending",
  "date": "2024-01-15"
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors

#### `PUT /api/orders/:id`
Updates an existing order.

**Parameters**:
- `id` (number, required): Order number

**Request Body**:
```json
{
  "user_id": 1,
  "status": "completed"
}
```

**Response**: `201 Created`
```json
{
  "order_no": 1,
  "user_id": 1,
  "status": "completed",
  "date": "2024-01-15"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid order number or validation errors
- `404 Not Found`: Order not found

#### `DELETE /api/orders/:id`
Deletes an order by order number.

**Parameters**:
- `id` (number, required): Order number

**Response**: `204 No Content`

**Error Responses**:
- `400 Bad Request`: Invalid order number format
- `404 Not Found`: Order not found

---

## Order Items API

### Endpoints

#### `GET /api/orderItems`
Lists all order items.

**Response**: `200 OK`
```json
[
  {
    "cart_id": 1,
    "order_no": 1,
    "prod_id": 1,
    "quantity": 2,
    "price": 7.98
  }
]
```

#### `GET /api/orderItems/order-details`
Lists all order items with product and order details.

**Response**: `200 OK`
```json
[
  {
    "cart_id": 1,
    "order_no": 1,
    "prod_id": 1,
    "prod_name": "Milk",
    "quantity": 2,
    "price": 7.98
  }
]
```

#### `GET /api/orderItems/:id`
Retrieves a single order item by cart ID.

**Parameters**:
- `id` (number, required): Cart ID

**Response**: `200 OK`
```json
{
  "cart_id": 1,
  "order_no": 1,
  "prod_id": 1,
  "quantity": 2,
  "price": 7.98
}
```

**Error Responses**:
- `400 Bad Request`: Invalid cart ID format
- `404 Not Found`: Order item not found

#### `POST /api/orderItems`
Creates a new order item.

**Request Body**:
```json
{
  "order_no": 1,
  "prod_id": 1,
  "quantity": 2
}
```

**Response**: `201 Created`
```json
{
  "cart_id": 1,
  "order_no": 1,
  "prod_id": 1,
  "quantity": 2,
  "price": 7.98
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors

#### `PUT /api/orderItems/:id`
Updates an existing order item.

**Parameters**:
- `id` (number, required): Cart ID

**Request Body**:
```json
{
  "quantity": 3
}
```

**Response**: `201 Created`
```json
{
  "cart_id": 1,
  "order_no": 1,
  "prod_id": 1,
  "quantity": 3,
  "price": 11.97
}
```

**Error Responses**:
- `400 Bad Request`: Invalid cart ID or validation errors
- `404 Not Found`: Order item not found

#### `DELETE /api/orderItems/:id`
Deletes an order item by cart ID.

**Parameters**:
- `id` (number, required): Cart ID

**Response**: `204 No Content`

**Error Responses**:
- `400 Bad Request`: Invalid cart ID format
- `404 Not Found`: Order item not found

---

## Alerts API

### Endpoints

#### `GET /api/alerts`
Lists all alerts.

**Response**: `200 OK`
```json
[
  {
    "alert_id": 1,
    "f_id": 1,
    "prod_id": 1,
    "message": "Low stock alert",
    "created_at": "2024-01-15T10:00:00Z"
  }
]
```

#### `GET /api/alerts/alerts-details`
Lists all alerts with product and user details.

**Response**: `200 OK`
```json
[
  {
    "alert_id": 1,
    "f_id": 1,
    "prod_id": 1,
    "prod_name": "Milk",
    "message": "Low stock alert",
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe"
  }
]
```

#### `GET /api/alerts/:id`
Retrieves a single alert by ID.

**Parameters**:
- `id` (number, required): Alert ID

**Response**: `200 OK`
```json
{
  "alert_id": 1,
  "f_id": 1,
  "prod_id": 1,
  "message": "Low stock alert",
  "created_at": "2024-01-15T10:00:00Z"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid ID format
- `404 Not Found`: Alert not found

#### `POST /api/alerts`
Creates a new alert.

**Request Body**:
```json
{
  "f_id": 1,
  "prod_id": 1,
  "message": "Low stock alert"
}
```

**Response**: `201 Created`
```json
{
  "alert_id": 1,
  "f_id": 1,
  "prod_id": 1,
  "message": "Low stock alert",
  "created_at": "2024-01-15T10:00:00Z"
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors

#### `PUT /api/alerts/:id`
Updates an existing alert.

**Parameters**:
- `id` (number, required): Alert ID

**Request Body**:
```json
{
  "message": "Updated alert message"
}
```

**Response**: `201 Created`
```json
{
  "alert_id": 1,
  "f_id": 1,
  "prod_id": 1,
  "message": "Updated alert message",
  "created_at": "2024-01-15T10:00:00Z"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid ID or validation errors
- `404 Not Found`: Alert not found

#### `DELETE /api/alerts/:id`
Deletes an alert by ID.

**Parameters**:
- `id` (number, required): Alert ID

**Response**: `204 No Content`

**Error Responses**:
- `400 Bad Request`: Invalid ID format
- `404 Not Found`: Alert not found

---

## Service Layer Methods

### UserService

#### `listUser()`
**Returns**: `Promise<Array<UserDTO>>`
- Retrieves all users from the repository and maps them to UserDTO objects.
- **Throws**: Error if retrieval fails.

#### `getUser(user_id: number)`
**Parameters**:
- `user_id` (number, required): User ID

**Returns**: `Promise<UserDTO | null>`
- Retrieves a specific user by ID.
- Returns null if user not found.
- **Throws**: Error if ID is invalid or retrieval fails.

#### `createUser(data: Object)`
**Parameters**:
- `data` (Object, required): User data with fields: `first_name`, `last_name`, `email`, `city`, `password`

**Returns**: `Promise<UserDTO>`
- Creates a new user record.
- **Throws**: Error if required fields are missing or creation fails.

#### `updateUser(user_id: number, data: Object)`
**Parameters**:
- `user_id` (number, required): User ID
- `data` (Object, required): User data to update

**Returns**: `Promise<UserDTO | null>`
- Updates an existing user record.
- Returns null if user not found.
- **Throws**: Error if validation fails or update fails.

#### `deleteUser(user_id: number)`
**Parameters**:
- `user_id` (number, required): User ID

**Returns**: `Promise<boolean>`
- Deletes a user record by ID.
- Returns true if deletion succeeded, false otherwise.
- **Throws**: Error if validation fails or deletion fails.

#### `authenticateUser(email: string, password: string)`
**Parameters**:
- `email` (string, required): User email
- `password` (string, required): User password

**Returns**: `Promise<UserDTO>`
- Authenticates a user by email and password.
- **Throws**: Error if authentication fails.

---

### ProductsService

#### `listProducts()`
**Returns**: `Promise<Array<ProductsDTO>>`
- Retrieves all products from the repository and maps them to ProductsDTO objects.
- **Throws**: Error if fetching fails.

#### `getProduct(prod_id: number)`
**Parameters**:
- `prod_id` (number, required): Product ID

**Returns**: `Promise<ProductsDTO | null>`
- Retrieves a specific product by ID.
- Returns null if product not found.
- **Throws**: Error if ID is invalid or retrieval fails.

#### `createProduct(data: Object)`
**Parameters**:
- `data` (Object, required): Product data with fields: `prod_name`, `prod_price`

**Returns**: `Promise<ProductsDTO>`
- Creates a new product record.
- **Throws**: Error if required fields are missing or creation fails.

#### `updateProduct(prod_id: number, data: Object)`
**Parameters**:
- `prod_id` (number, required): Product ID
- `data` (Object, required): Product data to update

**Returns**: `Promise<ProductsDTO | null>`
- Updates an existing product record.
- Returns null if product not found.
- **Throws**: Error if validation or update fails.

#### `deleteProduct(prod_id: number)`
**Parameters**:
- `prod_id` (number, required): Product ID

**Returns**: `Promise<boolean>`
- Deletes a product record by ID.
- Returns true if deletion was successful, false otherwise.
- **Throws**: Error if deletion fails or ID is invalid.

---

### FridgeService

#### `listFridges()`
**Returns**: `Promise<Array<FridgeDTO>>`
- Retrieves all fridges from the repository and maps them to FridgeDTO objects.
- **Throws**: Error if fetching fails.

#### `getFridge(f_id: number)`
**Parameters**:
- `f_id` (number, required): Fridge ID

**Returns**: `Promise<FridgeDTO | null>`
- Retrieves a specific fridge by ID.
- Returns null if fridge not found.
- **Throws**: Error if ID is invalid or retrieval fails.

#### `createFridge(data: Object)`
**Parameters**:
- `data` (Object, required): Fridge data with fields: `f_name`, `location`, `restock_limit`

**Returns**: `Promise<FridgeDTO>`
- Creates a new fridge record.
- **Throws**: Error if fridge creation fails.

#### `updateFridge(f_id: number, data: Object)`
**Parameters**:
- `f_id` (number, required): Fridge ID
- `data` (Object, required): Fridge data to update

**Returns**: `Promise<FridgeDTO | null>`
- Updates an existing fridge record.
- Returns null if fridge not found.
- **Throws**: Error if validation or update fails.

#### `deleteFridge(f_id: number)`
**Parameters**:
- `f_id` (number, required): Fridge ID

**Returns**: `Promise<boolean>`
- Deletes a fridge record by ID.
- Returns true if deletion was successful, false otherwise.
- **Throws**: Error if deletion fails or ID is invalid.

#### `getFridgeWithDetails()`
**Returns**: `Promise<Array<FridgeWithDetailsDTO> | null>`
- Retrieves all fridges along with their related details.
- Returns null if none found.
- **Throws**: Error if fetching fails.

#### `getAllFridges()`
**Returns**: `Promise<Array<FridgeWithDetailsDTO>>`
- Retrieves all fridges and converts them into FridgeWithDetailsDTO objects.
- A simplified version of getFridgeWithDetails.

#### `decrementItem(f_id: number, prod_id: number)`
**Parameters**:
- `f_id` (number, required): Fridge ID
- `prod_id` (number, required): Product ID

**Returns**: `Promise<FridgeDTO | null>`
- Decrements a specific item count from a fridge.
- Returns null if operation failed.
- **Throws**: Error if IDs are invalid or operation fails.

---

### OrdersService

#### `listOrders()`
**Returns**: `Promise<Array<OrdersDTO>>`
- Retrieves all orders from the repository and maps them to OrdersDTO objects.
- **Throws**: Error if fetching fails.

#### `getOrder(order_no: number)`
**Parameters**:
- `order_no` (number, required): Order number

**Returns**: `Promise<OrdersDTO | null>`
- Retrieves a specific order by order number.
- Returns null if order not found.
- **Throws**: Error if order number is invalid or retrieval fails.

#### `createOrder(data: Object)`
**Parameters**:
- `data` (Object, required): Order data with fields: `user_id`, `status` (optional, default: 'pending')

**Returns**: `Promise<OrdersDTO>`
- Creates a new order record.
- **Throws**: Error if order creation fails.

#### `updateOrder(order_no: number, data: Object)`
**Parameters**:
- `order_no` (number, required): Order number
- `data` (Object, required): Order data to update

**Returns**: `Promise<OrdersDTO | null>`
- Updates an existing order by order number.
- Returns null if order not found.
- **Throws**: Error if validation or update fails.

#### `deleteOrder(order_no: number)`
**Parameters**:
- `order_no` (number, required): Order number

**Returns**: `Promise<boolean>`
- Deletes an order by order number.
- Returns true if deletion was successful, false otherwise.
- **Throws**: Error if deletion fails or order number is invalid.

#### `getOrderWithDetails()`
**Returns**: `Promise<Array<OrderWithDetailsDTO> | null>`
- Retrieves all orders along with their related details.
- Returns null if none found.
- **Throws**: Error if fetching detailed order data fails.

#### `getAllOrders()`
**Returns**: `Promise<Array<OrderWithDetailsDTO>>`
- Retrieves all orders and converts them into OrderWithDetailsDTO objects.
- A simplified version of getOrderWithDetails.

---

### OrderItemsService

#### `listOrderItems()`
**Returns**: `Promise<Array<OrderItemsDTO>>`
- Retrieves all order items from the repository and maps them to OrderItemsDTO objects.
- **Throws**: Error if fetching fails.

#### `getOrderItems(cart_id: number)`
**Parameters**:
- `cart_id` (number, required): Cart ID

**Returns**: `Promise<OrderItemsDTO | null>`
- Retrieves specific order items by cart ID.
- Returns null if order items not found.
- **Throws**: Error if cart ID is invalid or retrieval fails.

#### `createOrderItems(data: Object)`
**Parameters**:
- `data` (Object, required): Order items data with fields: `order_no`, `prod_id`, `quantity`

**Returns**: `Promise<OrderItemsDTO>`
- Creates new order items.
- **Throws**: Error if creation fails.

#### `updateOrderItems(cart_id: number, data: Object)`
**Parameters**:
- `cart_id` (number, required): Cart ID
- `data` (Object, required): Order items data to update

**Returns**: `Promise<OrderItemsDTO | null>`
- Updates existing order items by cart ID.
- Returns null if order items not found.
- **Throws**: Error if validation or update fails.

#### `deleteOrderItems(cart_id: number)`
**Parameters**:
- `cart_id` (number, required): Cart ID

**Returns**: `Promise<boolean>`
- Deletes order items by cart ID.
- Returns true if deletion was successful, false otherwise.
- **Throws**: Error if deletion fails or ID is invalid.

#### `getOrderItemsWithDetails()`
**Returns**: `Promise<Array<OrderItemsWithDetailsDTO> | null>`
- Retrieves all order items along with their related details.
- Returns null if none found.
- **Throws**: Error if fetching data fails.

#### `getAllOrderItems()`
**Returns**: `Promise<Array<OrderItemsWithDetailsDTO>>`
- Retrieves all order items and converts them into OrderItemsWithDetailsDTO objects.
- A simplified version of getOrderItemsWithDetails.

---

### AlertsService

#### `listAlerts()`
**Returns**: `Promise<Array<AlertDTO>>`
- Retrieves all alerts from the repository and maps them to AlertDTO objects.
- **Throws**: Error if fetching fails.

#### `getAlert(alert_id: number)`
**Parameters**:
- `alert_id` (number, required): Alert ID

**Returns**: `Promise<AlertDTO | null>`
- Retrieves a specific alert by ID.
- Returns null if alert not found.
- **Throws**: Error if ID is invalid or fetching fails.

#### `createAlert(data: Object)`
**Parameters**:
- `data` (Object, required): Alert data with fields: `f_id`, `prod_id`, `message`

**Returns**: `Promise<AlertDTO>`
- Creates a new alert.
- **Throws**: Error if creating the alert fails.

#### `updateAlert(alert_id: number, data: Object)`
**Parameters**:
- `alert_id` (number, required): Alert ID
- `data` (Object, required): Alert data to update

**Returns**: `Promise<AlertDTO | null>`
- Updates an existing alert by ID.
- Returns null if alert not found.
- **Throws**: Error if validation or update fails.

#### `deleteAlert(alert_id: number)`
**Parameters**:
- `alert_id` (number, required): Alert ID

**Returns**: `Promise<boolean>`
- Deletes an alert by ID.
- Returns true if deletion was successful, false otherwise.
- **Throws**: Error if deletion fails or ID is invalid.

#### `getAlertWithDetails()`
**Returns**: `Promise<Array<AlertsWithDetailsDTO> | null>`
- Retrieves all alerts along with their related details.
- Returns null if none found.
- **Throws**: Error if fetching data fails.

#### `getAllAlerts()`
**Returns**: `Promise<Array<AlertsWithDetailsDTO>>`
- Retrieves all alerts and converts them into AlertsWithDetailsDTO objects.
- A simplified version of getAlertWithDetails.

---

## Repository Layer Methods

### UserRepository

#### `findAll()`
**Returns**: `Promise<Array<User>>`
- Retrieves all users from the database.

#### `findById(user_id: number)`
**Parameters**:
- `user_id` (number, required): User ID

**Returns**: `Promise<User | null>`
- Finds a specific user by ID.
- Returns null if user not found.

#### `create(data: Object)`
**Parameters**:
- `data` (Object, required): User data

**Returns**: `Promise<User>`
- Creates a new user in the database.
- Returns the newly created User object.

#### `update(user_id: number, data: Object)`
**Parameters**:
- `user_id` (number, required): User ID
- `data` (Object, required): User data to update

**Returns**: `Promise<User | null>`
- Updates an existing user.
- Returns null if user not found.

#### `delete(user_id: number)`
**Parameters**:
- `user_id` (number, required): User ID

**Returns**: `Promise<boolean>`
- Deletes a user from the database.
- Returns true if user was deleted, false otherwise.

#### `authenticateUser(email: string, password: string)`
**Parameters**:
- `email` (string, required): User email
- `password` (string, required): User password

**Returns**: `Promise<User | null>`
- Authenticates a user by email and password.
- Returns null if authentication fails.

---

### ProductsRepository

#### `findAll()`
**Returns**: `Promise<Array<Products>>`
- Retrieves all products from the database.

#### `findById(prod_id: number)`
**Parameters**:
- `prod_id` (number, required): Product ID

**Returns**: `Promise<Products | null>`
- Finds a specific product by ID.
- Returns null if product not found.

#### `create(data: Object)`
**Parameters**:
- `data` (Object, required): Product data

**Returns**: `Promise<Products>`
- Creates a new product in the database.
- Returns the newly created Products object.

#### `update(prod_id: number, data: Object)`
**Parameters**:
- `prod_id` (number, required): Product ID
- `data` (Object, required): Product data to update

**Returns**: `Promise<Products | null>`
- Updates an existing product.
- Returns null if product not found.

#### `delete(prod_id: number)`
**Parameters**:
- `prod_id` (number, required): Product ID

**Returns**: `Promise<boolean>`
- Deletes a product from the database.
- Returns true if product was deleted, false otherwise.

---

### FridgeRepository

#### `findAll()`
**Returns**: `Promise<Array<Fridge>>`
- Retrieves all fridges from the database.

#### `findById(f_id: number)`
**Parameters**:
- `f_id` (number, required): Fridge ID

**Returns**: `Promise<Fridge | null>`
- Finds a specific fridge by ID.
- Returns null if fridge not found.

#### `create(data: Object)`
**Parameters**:
- `data` (Object, required): Fridge data

**Returns**: `Promise<Fridge>`
- Creates a new fridge in the database.
- Returns the newly created Fridge object.

#### `update(f_id: number, data: Object)`
**Parameters**:
- `f_id` (number, required): Fridge ID
- `data` (Object, required): Fridge data to update

**Returns**: `Promise<Fridge | null>`
- Updates an existing fridge.
- Returns null if fridge not found.

#### `delete(f_id: number)`
**Parameters**:
- `f_id` (number, required): Fridge ID

**Returns**: `Promise<boolean>`
- Deletes a fridge from the database.
- Returns true if fridge was deleted, false otherwise.

#### `findAllWithDetails()`
**Returns**: `Promise<Array<FridgeWithDetailsDTO>>`
- Retrieves all fridges with detailed information.
- Returns a list of FridgeWithDetailsDTO objects.

#### `findAllFridges()`
**Returns**: `Promise<Array<Object>>`
- Retrieves all fridges with joined data.
- Returns raw joined rows.

#### `decrementItem(f_id: number, prod_id: number)`
**Parameters**:
- `f_id` (number, required): Fridge ID
- `prod_id` (number, required): Product ID

**Returns**: `Promise<Fridge | null>`
- Decrements a specific item count from a fridge.
- Returns null if operation failed.

---

### OrdersRepository

#### `findAll()`
**Returns**: `Promise<Array<Orders>>`
- Retrieves all orders from the database ordered by most recent date.

#### `findById(order_no: number)`
**Parameters**:
- `order_no` (number, required): Order number

**Returns**: `Promise<Orders | null>`
- Finds a specific order by order number.
- Returns null if order not found.

#### `create(data: Object)`
**Parameters**:
- `data` (Object, required): Order data with `user_id` and optional `status` (default: 'pending')

**Returns**: `Promise<Orders>`
- Creates a new order with the given user ID and status.
- Automatically sets creation and update timestamps.
- Returns the newly created Order object.

#### `update(order_no: number, data: Object)`
**Parameters**:
- `order_no` (number, required): Order number
- `data` (Object, required): Order data to update

**Returns**: `Promise<Orders | null>`
- Updates an existing order identified by its order number.
- Returns null if order not found.

#### `delete(order_no: number)`
**Parameters**:
- `order_no` (number, required): Order number

**Returns**: `Promise<boolean>`
- Deletes an order from the database.
- Returns true if order was deleted, false otherwise.

#### `findAllOrders()`
**Returns**: `Promise<Array<Object>>`
- Retrieves all orders along with their associated user information.
- Returns raw joined rows from the orders and users tables.

#### `findAllWithDetails()`
**Returns**: `Promise<Array<OrderWithDetailsDTO>>`
- Retrieves all orders with detailed user information.
- Returns a list of OrderWithDetailsDTO objects.

---

### OrderItemsRepository

#### `findAll()`
**Returns**: `Promise<Array<OrderItems>>`
- Retrieves all order items from the database.

#### `findById(cart_id: number)`
**Parameters**:
- `cart_id` (number, required): Cart ID

**Returns**: `Promise<OrderItems | null>`
- Finds a specific order item by cart ID.
- Returns null if order item not found.

#### `create(data: Object)`
**Parameters**:
- `data` (Object, required): Order items data

**Returns**: `Promise<OrderItems>`
- Creates new order items in the database.
- Returns the newly created OrderItems object.

#### `update(cart_id: number, data: Object)`
**Parameters**:
- `cart_id` (number, required): Cart ID
- `data` (Object, required): Order items data to update

**Returns**: `Promise<OrderItems | null>`
- Updates existing order items.
- Returns null if order items not found.

#### `delete(cart_id: number)`
**Parameters**:
- `cart_id` (number, required): Cart ID

**Returns**: `Promise<boolean>`
- Deletes order items from the database.
- Returns true if order items were deleted, false otherwise.

#### `findAllWithDetails()`
**Returns**: `Promise<Array<OrderItemsWithDetailsDTO>>`
- Retrieves all order items along with their related details.
- Returns a list of OrderItemsWithDetailsDTO objects.

#### `findAllOrders()`
**Returns**: `Promise<Array<Object>>`
- Retrieves all order items with joined data.
- Returns raw joined rows.

---

### AlertsRepository

#### `findAll()`
**Returns**: `Promise<Array<Alerts>>`
- Retrieves all alerts from the database.

#### `findById(alert_id: number)`
**Parameters**:
- `alert_id` (number, required): Alert ID

**Returns**: `Promise<Alerts | null>`
- Finds a specific alert by ID.
- Returns null if alert not found.

#### `create(data: Object)`
**Parameters**:
- `data` (Object, required): Alert data

**Returns**: `Promise<Alerts>`
- Creates a new alert in the database.
- Returns the newly created Alerts object.

#### `update(alert_id: number, data: Object)`
**Parameters**:
- `alert_id` (number, required): Alert ID
- `data` (Object, required): Alert data to update

**Returns**: `Promise<Alerts | null>`
- Updates an existing alert.
- Returns null if alert not found.

#### `delete(alert_id: number)`
**Parameters**:
- `alert_id` (number, required): Alert ID

**Returns**: `Promise<boolean>`
- Deletes an alert from the database.
- Returns true if alert was deleted, false otherwise.

#### `findAllWithDetails()`
**Returns**: `Promise<Array<AlertsWithDetailsDTO>>`
- Retrieves all alerts along with their related details.
- Returns a list of AlertsWithDetailsDTO objects.

#### `findAllAlerts()`
**Returns**: `Promise<Array<Object>>`
- Retrieves all alerts with joined data.
- Returns raw joined rows.

---

## Frontend Routes

The application also includes frontend view routes for rendering EJS templates:

- `GET /` - Home page
- `GET /login` - Login page
- `POST /login` - Login form submission
- `GET /register` - Registration page
- `POST /register` - Registration form submission
- `GET /dashboard` - Dashboard page
- `GET /products` - Products list page
- `GET /products/new` - New product form
- `GET /products/:id/edit` - Edit product form
- `GET /fridge` - Fridge management page
- `GET /fridges` - Fridges list page
- `GET /fridges/new` - New fridge form
- `GET /fridges/:id` - Manage specific fridge
- `GET /fridges/:id/edit` - Edit fridge form
- `GET /alerts` - Alerts list page
- `GET /orders/new` - Create order page
- `GET /orders/history` - Order history page
- `GET /logout` - Logout (redirects to home)

---

## Error Handling

All API endpoints use consistent error handling:

- **400 Bad Request**: Invalid input or validation errors
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

Error responses follow this format:
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

Or for simple errors:
```json
{
  "message": "Error message"
}
```

---

## Notes

- All IDs must be valid numbers
- All date fields are formatted as ISO 8601 strings or YYYY-MM-DD format
- Authentication is handled through the UserService.authenticateUser method
- The application uses DTOs (Data Transfer Objects) for consistent data formatting
- All timestamps are automatically managed by the database

