# Microservices Documentation

This project consists of three microservices: `User`, `Ride`, and `Captain`. These services communicate with each other using RabbitMQ for asynchronous communication.

## User Service

### Routes

1. **Register User**

   - **Endpoint**: `/user/register`
   - **Method**: `POST`
   - **Description**: Registers a new user.
   - **Request Body**:
     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "string",
       "newUser": {
         "name": "string",
         "email": "string",
         "_id": "string"
       }
     }
     ```

2. **Login User**

   - **Endpoint**: `/user/login`
   - **Method**: `POST`
   - **Description**: Logs in a user.
   - **Request Body**:
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "string",
       "user": {
         "name": "string",
         "email": "string",
         "_id": "string"
       }
     }
     ```

3. **Logout User**

   - **Endpoint**: `/user/logout`
   - **Method**: `POST`
   - **Description**: Logs out a user by blacklisting the token.

4. **Get User Profile**

   - **Endpoint**: `/user/profile`
   - **Method**: `GET`
   - **Description**: Fetches the profile of the logged-in user.

5. **Accepted Ride Notification**
   - **Endpoint**: `/user/accepted-ride`
   - **Method**: `GET`
   - **Description**: Long-polling endpoint to wait for ride acceptance notifications.

---

## Ride Service

### Routes

1. **Create Ride**

   - **Endpoint**: `/ride/create-ride`
   - **Method**: `POST`
   - **Description**: Creates a new ride request.
   - **Request Body**:
     ```json
     {
       "pickup": "string",
       "destination": "string"
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "string",
       "user": "string",
       "pickup": "string",
       "destination": "string",
       "status": "string"
     }
     ```

2. **Accept Ride**
   - **Endpoint**: `/ride/accept-ride`
   - **Method**: `POST`
   - **Description**: Accepts a ride request.
   - **Query Params**:
     ```
     rideId: string
     ```
   - **Response**:
     ```json
     {
       "_id": "string",
       "user": "string",
       "pickup": "string",
       "destination": "string",
       "status": "accepted"
     }
     ```

---

## Captain Service

### Routes

1. **Register Captain**

   - **Endpoint**: `/captain/register`
   - **Method**: `POST`
   - **Description**: Registers a new captain.
   - **Request Body**:
     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "string",
       "newCaptain": {
         "name": "string",
         "email": "string",
         "_id": "string"
       }
     }
     ```

2. **Login Captain**

   - **Endpoint**: `/captain/login`
   - **Method**: `POST`
   - **Description**: Logs in a captain.
   - **Request Body**:
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "string",
       "captain": {
         "name": "string",
         "email": "string",
         "_id": "string"
       }
     }
     ```

3. **Logout Captain**

   - **Endpoint**: `/captain/logout`
   - **Method**: `POST`
   - **Description**: Logs out a captain by blacklisting the token.

4. **Get Captain Profile**

   - **Endpoint**: `/captain/profile`
   - **Method**: `GET`
   - **Description**: Fetches the profile of the logged-in captain.

5. **Toggle Availability**

   - **Endpoint**: `/captain/toggle-availability`
   - **Method**: `PATCH`
   - **Description**: Toggles the availability status of the logged-in captain.
   - **Response**:
     ```json
     {
       "_id": "string",
       "name": "string",
       "email": "string",
       "isAvailable": "boolean"
     }
     ```

6. **Wait for New Ride**
   - **Endpoint**: `/captain/new-ride`
   - **Method**: `GET`
   - **Description**: Long-polling endpoint to wait for new ride requests.

---

## RabbitMQ for Asynchronous Communication

RabbitMQ is used for decoupling services and enabling asynchronous communication between them.

### CLOUDAMQP

used for cloud rabbitMq services

### Queues

1. **`new-ride`**

   - **Publisher**: Ride Service
   - **Subscriber**: Captain Service
   - **Description**: Notifies captains about new ride requests.

2. **`ride-accepted`**
   - **Publisher**: Captain Service
   - **Subscriber**: User Service
   - **Description**: Notifies users when a ride is accepted.

### Workflow

1. When a user creates a ride, the Ride Service publishes a message to the `new-ride` queue.
2. Captains subscribed to the `new-ride` queue receive the message and can accept the ride.
3. When a captain accepts a ride, the Captain Service publishes a message to the `ride-accepted` queue.
4. The User Service listens to the `ride-accepted` queue and notifies the user about the accepted ride.

---

## Environment Variables

Each service uses the following environment variables:

- `JWT_SECRET`: Secret key for JWT authentication.
- `MONGO_URL`: MongoDB connection string.
- `RABBIT_URL`: RabbitMQ connection string.
- `BASE_URL`: Base URL for inter-service communication.

---
