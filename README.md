# FUTA Events API

A public REST API for Federal University of Technology Akure (FUTA) developers to create, manage and discover campus events.

**Base URL:** `https://futa-events-api.onrender.com`

> ⚠️ This API is hosted on Render's free tier. The first request may take up to 50 seconds if the server has been inactive.

---

## Authentication

This API uses **JWT (JSON Web Tokens)** for authentication. Protected routes require a token in the request header:

```
Authorization: Bearer <your_token>
```

You can get a token by registering and logging in.

---

## Endpoints

### 👤 Users

#### Register
`POST /user/register`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "message": "user saved"
}
```

---

#### Login
`POST /user/login`

Logs in a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "johndoe@gmail.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "name": "John Doe",
  "JWTtoken": "<your_jwt_token>"
}
```

---

### 📅 Events

#### Get All Events
`GET /events` — **Public**

Returns a list of all events.

---

#### Get Single Event
`GET /events/:id` — **Public**

Returns a single event by ID.

---

#### Create Event
`POST /events` — **Protected** 🔒

Creates a new event. Requires a valid JWT token.

**Request Body:**
```json
{
  "title": "Design with Kad",
  "description": "A 3 hour class on the fundamentals of design",
  "date": "12th of May, 2026",
  "location": "SOC LT II",
  "host": "KAD",
  "phoneNumber": "08023145411",
  "guests": ["Iyiade", "Mayowa", "Onyx"],
  "registrationLink": "www.votelive.click"
}
```

---

#### Update Event
`PUT /events/:id` — **Protected** 🔒

Updates an event. Only the creator of the event can update it.

**Request Body:** Any fields you want to update.

---

#### Delete Event
`DELETE /events/:id` — **Protected** 🔒

Deletes an event. Only the creator of the event can delete it.

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/Ademayo959/futa-events-api.git

# Install dependencies
npm install

# Create a .env file with the following:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000

# Start the server
node server.js
```

---

## Tech Stack

- **Node.js** — Runtime
- **Express.js** — Web framework
- **MongoDB Atlas** — Database
- **Mongoose** — ODM
- **bcryptjs** — Password hashing
- **jsonwebtoken** — Authentication
- **express-rate-limit** — Rate limiting

---

## Author

**Oluwamayowa** — [@Ademayo959](https://github.com/Ademayo959)
