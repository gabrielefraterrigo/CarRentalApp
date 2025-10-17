# PalerMove - Car and Scooter Sharing App

**Repository:** CarRentalApp  
**Project Type:** University Project  
**Contributors:** Gabriele Fraterrigo and 2 colleagues  

---

## Overview

PalerMove is a full-stack car and scooter sharing application designed to facilitate vehicle reservation for users and service management for administrators.  
The system aims to make car-sharing services **accessible, safe, and user-friendly**, providing options such as driver-assisted rentals and verification of valid driver licenses.

The architecture follows a **Client-Server model**. Client nodes represent user devices accessing the service, and all data is managed centrally. Communication between nodes is handled via **HTTP**.

---

## Technologies Used

- **Frontend:** ReactJS, React Router, ReactMapGL, Axios, ReactMap Geocoder  
- **Backend:** NodeJS, ExpressJS, MySQL, JSON Web Token (JWT), Bcrypt  
- **APIs:** Mapbox (for reverse geocoding and mapping features)  

---

## Features

- User authentication and role-based access (admin and user)  
- Full vehicle reservation system with driver verification  
- Interactive map with **reverse geocoding** via Mapbox API  
- Responsive frontend design for web and mobile devices  
- Secure backend with JWT authentication and password hashing (Bcrypt)  
- Database integration with MySQL  

---

## Repository Structure

CarRentalApp/
├── frontend/ # ReactJS frontend application
├── backend/ # NodeJS + ExpressJS server
├── SDD/ # Software Design Document
├── RAD/ # Requirements Analysis Document
├── README.md # Project documentation


- **frontend/**: Contains all React components, routing, map integration, and API requests using Axios.  
- **backend/**: Handles REST API endpoints, database operations, and authentication logic.  
- **SDD & RAD**: Detailed design and analysis documents for reference.  

---

## Installation & Setup

### Prerequisites
- Node.js >= 14.x  
- npm >= 6.x  
- MySQL database  

### Setup Steps

1. Clone the repository:  
   ```bash
   git clone https://github.com/gabrielefraterrigo/CarRentalApp.git
   cd CarRentalApp

2. Setup backend:
   ```bash
   cd backend
   npm install
   # configure your .env file with DB credentials and JWT secret
   npm start

3. Setup frontend:
   ```bash
   cd ../frontend
   npm install
   npm start

4. Open http://localhost:3000 in your browser 
