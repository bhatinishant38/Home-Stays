# Airbnb Clone

A full-stack web application replicating key features of Airbnb, built using Node.js, Express, MongoDB, and EJS template engine following the MVC architecture.

## 🚀 Features

* **User Authentication & Authorization**: Secure signup and login workflows using hashed passwords and session management.
* **Property Listings**: View registered homes, explore detailed property descriptions, location details, and pricing per night.
* **User Favorites**: Save and manage a list of favorite listings with a single tap.
* **Bookings System**: Manage stay reservations directly within the platform.
* **MVC Architecture**: Modular and maintainable code base cleanly separating Models, Views, and Controllers.

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Frontend**: EJS (Embedded JavaScript templates), HTML5, CSS3
* **Database**: MongoDB / Mongoose
* **Authentication**: Passport.js / Express-Session & bcrypt

## 📁 Project Structure

```text
├── controllers/      # Handles business logic and request processing
├── models/           # Mongoose schemas and data models
├── routes/           # Application route definitions
├── views/            # EJS template files for dynamic UI rendering
├── public/           # Static assets (CSS, images, JS)
├── app.js            # Express application setup and server entry point
└── package.json      # Dependencies and scripts
