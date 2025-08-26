
# School Management API

This is a Node.js API project for managing school data. It allows users to **add new schools** and **retrieve a list of schools sorted by proximity** to a given location. The backend is built using **Node.js**, **Express.js**, and **MySQL**.

---

## Live API

The API is hosted at:
**Base URL:** [https://educase-jnxm.onrender.com](https://educase-jnxm.onrender.com)

You can also access the **Swagger UI** for interactive API documentation at:
**Swagger UI:** [https://educase-jnxm.onrender.com/api-docs](https://educase-jnxm.onrender.com/api-docs)

---

## Database Setup

Create a `schools` table in MySQL with the following structure:

| Field      | Type     | Notes                |
|------------|----------|---------------------|
| id         | INT      | Primary Key, Auto Increment |
| name       | VARCHAR  | Name of the school  |
| address    | VARCHAR  | School address      |
| latitude   | FLOAT    | Latitude coordinate |
| longitude  | FLOAT    | Longitude coordinate|

---

## API Endpoints

### 1. Add School

- **Endpoint:** `/api/addSchool`
- **Method:** POST
- **Request Body Example:**
```json
{
    "name": "Greenwood High",
    "address": "123 Main St, City",
    "latitude": 40.7128,
    "longitude": -74.0060
}
````

* **Response Examples:**

  * Success (201 Created):

  ```json
  {
      "message": "School added successfully"
  }
  ```

  * Validation Error (400 Bad Request):

  ```json
  {
      "error": "Invalid name/address/coordinates"
  }
  ```

  * Server Error (500 Internal Server Error):

  ```json
  {
      "error": "Database error"
  }
  ```

---

### 2. List Schools

* **Endpoint:** `/api/listSchools`
* **Method:** GET
* **Query Parameters:**

  * `lat` – User’s latitude (required)
  * `lon` – User’s longitude (required)
* **Example Request:**

```
GET /api/listSchools?lat=40.730610&lon=-73.935242
```

* **Response Example (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Greenwood High",
    "address": "123 Main St, City",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "distance_km": 7.2
  }
]
```

---

## Features

* Add a school with **input validation**.
* List schools **sorted by distance** to the user.
* Distance calculation uses the **Haversine formula**.
* Fully documented with **Swagger UI**.

---

## Testing

* A **Postman collection** is provided for testing both endpoints.
* Import the collection and use the live API URL: `https://educase-jnxm.onrender.com`.
* Test both endpoints with example requests to verify functionality.

---

## Deployment

* The app is deployed on **Render**.
* You can make POST and GET requests to the live API endpoints using the base URL provided above.
