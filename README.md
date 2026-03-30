# 🍿 Chill Clips - Frontend Application

![Chill Clips Version](https://img.shields.io/badge/version-3.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)

Chill Clips is a fully responsive, Netflix-inspired streaming platform frontend. Built as a Single Page Application (SPA) using React and Vite, it serves as the user-facing interface that communicates directly with a custom Java Spring Boot backend and MongoDB database.

## ✨ Key Features

* **📱 Fully Mobile Responsive:** Fluid scaling from 320px mobile screens up to 4K desktop displays using CSS clamp() and custom media queries. Includes a mobile slide-in drawer for navigation.
* **🔒 Secure Authentication:** Custom JWT-based user authentication (Sign In / Sign Up) communicating with a Java Spring Boot REST API. Unauthenticated users are met with a secure WatchGate.
* **🎬 Native Video Player:** Custom HTML5 video player component (`VideoPlayer.jsx`) with auto-play, screen-lock, and escape-to-close functionality.
* **🚀 SPA Routing:** Seamless navigation between Home, Movies, Series, and My List without page reloads.
* **🗂️ Dynamic Content Rendering:** Real-time filtering and categorization (Trending, Featured, Action, Sci-Fi, Drama, etc.).

## 🏗️ Architecture

This frontend is one piece of a complete 3-tier cloud architecture:
1.  **Frontend (This Repo):** React + Vite SPA.
2.  **Reverse Proxy:** Caddy Web Server handling HTTPS tunneling and routing traffic between the frontend and backend.
3.  **Backend & DB:** Java Spring Boot API connected to a MongoDB cluster.

## 🛠️ Tech Stack

* **Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Custom CSS (Variables, Flexbox, Grid, Clamp)
* **Routing:** React Router DOM (Simulated SPA logic)
* **Media:** HTML5 `<video>` API

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variable to your `.env` file in the root directory:

`VITE_API_URL=https://your-api-domain.com` 
*(Note: If the frontend and API are served on the same domain via a reverse proxy, relative paths like `/api/v1/...` can be used to bypass mixed-content and CORS issues).*

## 💻 Local Development Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/virusinferno911/chill-clips.git](https://github.com/virusinferno911/chill-clips.git)