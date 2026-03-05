🧵 Tailor Shop Management System

A full-stack tailor shop management application designed to help small tailoring businesses manage customers, orders, and shop workflows efficiently.

The system provides a modern dashboard interface with customer management, order tracking, and design management capabilities.

🚀 Tech Stack
Frontend

Angular (Standalone Components Architecture)
Angular Router
Angular Material
TypeScript
SCSS (Custom Theming)

Backend
Node.js
Express.js
MongoDB
Mongoose (ODM)

Tools
Git & GitHub
REST API
Postman (API testing)

✨ Key Features

Authentication
🔐 Login UI

Customer Management
👥 Add new customers
📄 View customer details
✏️ Manage customer records

Order Management
🧵 Create new tailoring orders
⏳ Track pending orders
📊 Dashboard overview of shop activity

Design Management
🎨 Manage clothing design references

UI System
📂 Responsive sidebar navigation
📊 Modular dashboard layout

🏗️ Architecture Highlights
Feature-based Angular architecture
Standalone Angular components (no NgModules)
RESTful API backend
MongoDB database integration
Clean separation between frontend and backend
Scalable modular folder structure

📁 Project Structure
tailor-shop-app
│
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── server.js
│   └── package.json
│
├── src
│   ├── app
│   │   ├── dashboard
│   │   ├── customers
│   │   ├── add-new-customer
│   │   ├── place-new-order
│   │   ├── sidebar
│   │   └── layout
│
├── public
├── angular.json
├── package.json
└── README.md

🛠️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/Rushik1997/tailor-shop-app.git
cd tailor-shop-app

2️⃣ Install Frontend Dependencies
npm install

3️⃣ Install Backend Dependencies
cd backend
npm install

▶️ Run Application
Start Backend Server
cd backend
node server.js

Backend will run on:
http://localhost:5000

Start Angular Frontend
ng serve

Frontend will run on:
http://localhost:4200

🧪 API Testing
API endpoints can be tested using:
Postman
Thunder Client
Curl

Example endpoint:
GET /api/customers
POST /api/orders

🏗️ Build Frontend
To create a production build:
ng build

Output will be generated in:
dist/

🎯 Project Goal
This project simulates a real-world small business management system while practicing:
Angular scalable architecture
REST API development
MongoDB data modeling
Full-stack application design

👨‍💻 Author
Rushikesh Kumthekar
Application Developer | Angular | TypeScript | Node.js
