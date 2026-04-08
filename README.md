# 🍿 Chill Clips - Frontend Application

**By Oluwasheyi Ojelade | Virusinferno Digital Studio**

Chill Clips is a fully responsive, premium streaming platform interface. Built as a Single Page Application (SPA) using React and Vite, it serves as the user-facing interface that communicates directly with a custom Java Spring Boot backend and MongoDB Atlas database.

## ✨ Key Features
* **Cinematic UI/UX:** A custom "Charcoal Grey & Brushed Gold" aesthetic designed to replicate premium streaming services, utilizing advanced CSS Grid, Flexbox, and CSS Variables.
* **Live Search Filtering:** Real-time search functionality utilizing React's `useMemo` hook to dynamically filter movies by title, genre, and description without network latency.
* **📱 Fully Mobile Responsive:** Fluid scaling from 320px mobile screens up to 4K desktop displays using CSS `clamp()` and custom media queries. Includes a mobile slide-in drawer for navigation.
* **🔒 Secure Authentication:** Custom JWT-based user authentication (Sign In / Sign Up) communicating with the Java REST API. Unauthenticated users are met with a secure WatchGate.
* **🎬 Native Video Player:** Custom HTML5 video player component with auto-play, screen-lock, and escape-to-close functionality.

## 🏗️ Architecture & Deployment
This frontend is the presentation layer of a complete 3-tier cloud architecture:
* **Frontend (This Repo):** React + Vite SPA, compiled into static assets.
* **Reverse Proxy:** A Dockerized **Caddy Web Server** handles automatic HTTPS SSL generation and routes traffic. The compiled `dist` folder is injected directly into the Caddy container volume (`/var/www/chill-clips`).
* **Backend API:** Traffic to `/api/v1/*` is reverse-proxied securely to an internal Spring Boot Docker container.

## 🛠️ Tech Stack
* **Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Custom CSS (Variables, Flexbox, Grid, Clamp)
* **Routing:** Custom SPA logic / React Router

## ⚙️ Environment Variables
To run this project, add the following environment variable to your `.env` file in the root directory:
```env
VITE_API_URL=[https://chill-clips.virusinferno.xyz](https://chill-clips.virusinferno.xyz)