# FeelTheMusic

**FeelTheMusic** is an intelligent, context-aware web application designed to curate personalized music recommendations based on the user's emotional state and real-time environmental factors. Built with a robust modern tech stack (React frontend, Node.js/Express backend, and MySQL database), the platform dynamically analyzes user emotions, local weather, timezones, and language preferences to deliver a seamless listening experience. By automatically adapting to the user's current mood and surroundings, FeelTheMusic ensures the perfect soundtrack for any given moment.

<img width="1600" height="893" alt="Image" src="https://github.com/user-attachments/assets/9b90fb00-18dc-4001-861b-f4448d136b56" />

## Project Overview

FeelTheMusic combines emotion detection, user preferences, and contextual signals to recommend music that fits the user's current state. The application includes a React/Vite frontend, an Express REST API, a MySQL database, and a Python FastAPI emotion-detection service powered by DeepFace.

## Key Features

- Emotion-aware music recommendations based on webcam emotion detection.
- Context-aware recommendation logic designed for weather, timezone, and language preferences.
- User authentication with JWT-protected backend routes.
- Song browsing, playlists, mood logs, ratings, and recommendation history.
- Python emotion microservice using FastAPI, DeepFace, and OpenCV.
- MySQL-backed persistence for users, songs, moods, playlists, ratings, and reports.

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, Framer Motion
- **Backend:** Node.js, Express, MySQL2, JWT, bcryptjs, CORS, dotenv
- **Database:** MySQL
- **Emotion Service:** Python, FastAPI, DeepFace, OpenCV, NumPy, Pydantic
- **Tooling:** npm, pip, Git

## Prerequisites

Install the following before running the project locally:

- Node.js 18 or newer
- npm
- MySQL 8 or compatible MySQL server
- Python 3.10 or newer
- Git

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sachina14072006-boop/Music-recommandation.git
   cd Music-recommandation
   ```

2. Install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd ../server
   npm install
   ```

4. Install emotion service dependencies:

   ```bash
   cd ../emotion-service
   pip install -r requirements.txt
   ```

5. Create the backend environment file:

   ```bash
   cd ../server
   ```

   Create `server/.env` with your local values:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=feelthemusic_db
   JWT_SECRET=replace_with_a_strong_secret
   ```

## Database Configuration

1. Sign in to MySQL:

   ```bash
   mysql -u root -p
   ```

2. Create the application database:

   ```sql
   CREATE DATABASE feelthemusic_db;
   ```

3. Load the schema and seed data from the project root:

   ```bash
   mysql -u root -p feelthemusic_db < database/schema.sql
   mysql -u root -p feelthemusic_db < database/seed.sql
   ```

If your local `database/schema.sql` or `database/seed.sql` files are empty, create the tables expected by the backend controllers before starting the API. The backend queries expect tables for users, songs, emotions, mood logs, playlists, ratings, and reports.

## Running the Application

Start each service in its own terminal.

Backend API:

```bash
cd server
npm run dev
```

Emotion detection service:

```bash
cd emotion-service
uvicorn main:app --reload --port 8000
```

Frontend development server:

```bash
cd client
npm run dev
```

By default, the frontend runs on Vite's local development URL and the backend API runs at `http://localhost:5000`.

## Folder Structure

```text
FeelTheMusic/
|-- client/              # React/Vite frontend
|   |-- public/          # Static assets, covers, and audio files
|   |-- src/             # React pages, components, services, and styles
|   |-- index.html       # Frontend HTML entry point
|   `-- package.json     # Frontend dependencies and scripts
|-- server/              # Node.js/Express backend API
|   |-- src/             # Routes, controllers, middleware, and config
|   `-- package.json     # Backend dependencies and scripts
|-- emotion-service/     # Python FastAPI emotion detection service
|   |-- main.py          # DeepFace emotion detection API
|   `-- requirements.txt # Python dependencies
|-- database/            # MySQL schema and seed scripts
|   |-- schema.sql
|   `-- seed.sql
|-- .gitignore
`-- README.md
```

## Git Cache Cleanup

If ignored files were committed before `.gitignore` was updated, remove them from Git's index while keeping them on disk:

```bash
git rm -r --cached .
git add .
git commit -m "chore: refresh tracked files after gitignore update"
```

## GitHub Upload Commands

Run these commands from the project root:

```bash
git init
git branch -M main
git add .
git commit -m "chore: prepare FeelTheMusic for production upload"
git remote add origin https://github.com/sachina14072006-boop/Music-recommandation.git
git push -u origin main
```

If the `origin` remote already exists, update it instead:

```bash
git remote set-url origin https://github.com/sachina14072006-boop/Music-recommandation.git
git push -u origin main
```
