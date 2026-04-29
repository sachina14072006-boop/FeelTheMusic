# FeelTheMusic

**FeelTheMusic** is an intelligent, context-aware web application that curates personalized music recommendations based on the user's emotional state and real-time context. It uses a React frontend, Node.js/Express backend, MySQL database, and a Python FastAPI emotion-detection service powered by DeepFace.

<img width="1600" height="893" alt="FeelTheMusic preview" src="https://github.com/user-attachments/assets/9b90fb00-18dc-4001-861b-f4448d136b56" />

## Live Deployment

- **Frontend:** https://client-beta-wheat-71.vercel.app
- **Backend API:** https://feelthemusic-backend-production.up.railway.app
- **Emotion Service:** https://feelthemusic-emotion-production.up.railway.app
- **Repository:** https://github.com/sachina14072006-boop/FeelTheMusic.git

## Key Features

- Webcam-based emotion detection.
- Emotion-aware song recommendations with rotating start tracks and player navigation.
- User registration and login with JWT authentication.
- Song library, playlists, mood logs, ratings, and reports.
- MySQL-backed data persistence.
- Separate Python emotion microservice using FastAPI, DeepFace, and OpenCV.

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, Framer Motion
- **Backend:** Node.js, Express, MySQL2, JWT, bcryptjs, CORS, dotenv
- **Database:** MySQL
- **Emotion Service:** Python, FastAPI, DeepFace, OpenCV, NumPy, Pydantic
- **Deployment:** Vercel, Railway, Railway MySQL

## Project Structure

```text
FeelTheMusic/
|-- client/              # React/Vite frontend
|-- server/              # Node.js/Express backend API
|-- emotion-service/     # Python FastAPI emotion detection service
|-- database/            # MySQL schema and seed files
|-- DEPLOYMENT_GUIDE.txt # Short deployment notes
|-- README.md
`-- .gitignore
```

## Prerequisites

- Node.js 18+
- npm
- MySQL 8+
- Python 3.10+
- Git

## Local Setup

Clone the repository:

```bash
git clone https://github.com/sachina14072006-boop/FeelTheMusic.git
cd FeelTheMusic
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

Install emotion service dependencies:

```bash
cd ../emotion-service
pip install -r requirements.txt
```

## Environment Variables

Create `server/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=feelthemusic_db
JWT_SECRET=replace_with_a_strong_secret
```

Optional local frontend variables can be placed in `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_EMOTION_API_URL=http://localhost:8000
```

## Database Setup

Create the local database:

```sql
CREATE DATABASE feelthemusic_db;
```

Apply schema and seed data from the project root:

```bash
mysql -u root -p feelthemusic_db < database/schema.sql
mysql -u root -p feelthemusic_db < database/seed.sql
```

## Running Locally

Start the backend:

```bash
cd server
npm run dev
```

Start the emotion service:

```bash
cd emotion-service
uvicorn main:app --reload --port 8000
```

Start the frontend:

```bash
cd client
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Emotion Service: `http://localhost:8000`

## Deployment Summary

- The frontend is deployed on **Vercel**.
- The backend API is deployed on **Railway**.
- The MySQL database is hosted on **Railway MySQL**.
- The emotion service is deployed on **Railway** using a Dockerfile because OpenCV requires Linux runtime libraries.

For more details, see `DEPLOYMENT_GUIDE.txt`.
