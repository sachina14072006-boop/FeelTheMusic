# FeelTheMusic

**FeelTheMusic** is an intelligent, context-aware web application designed to curate personalized music recommendations based on the user's emotional state and real-time environmental factors. Built with a robust modern tech stack (React frontend, Node.js/Express backend, and MySQL database), the platform dynamically analyzes user emotions, local weather, timezones, and language preferences to deliver a seamless listening experience. By automatically adapting to the user's current mood and surroundings, FeelTheMusic ensures the perfect soundtrack for any given moment.

## Key Features
- **Emotion Analysis:** Detects the user's emotional state via webcam using DeepFace to tailor music recommendations.
- **Context-Aware Recommendations:** Integrates local weather and timezone data to enhance the relevance of suggested songs.
- **Personalized Experience:** Considers language preferences and user mood history to curate the perfect playlist.
- **Dynamic Playback:** Local playback integration allows users to instantly listen to the recommended tracks.

## Tech Stack
- **Frontend:** React, Vite, Framer Motion
- **Backend:** Node.js, Express, JSON Web Tokens (JWT) for authentication
- **Database:** MySQL
- **Microservice:** Python, FastAPI, DeepFace, OpenCV (Emotion Detection Service)

## Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16+)
- [MySQL](https://dev.mysql.com/downloads/)
- [Python](https://www.python.org/downloads/) (v3.8+)
- [Git](https://git-scm.com/)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sachina14072006-boop/Music-recommandation.git
   cd Music-recommandation
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd ../server
   npm install
   ```

4. **Install Emotion Service Dependencies:**
   ```bash
   cd ../emotion-service
   pip install -r requirements.txt
   ```

5. **Set up Environment Variables:**
   Create a `.env` file in the `server` directory and add your configurations:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=feelthemusic_db
   JWT_SECRET=feelthemusic_super_secret_key
   ```

## Database Configuration

1. Log in to your MySQL instance:
   ```bash
   mysql -u root -p
   ```
2. Create the database:
   ```sql
   CREATE DATABASE feelthemusic_db;
   ```
3. Run the schema and seed files to set up the tables (navigate to the `database` folder):
   ```bash
   mysql -u root -p feelthemusic_db < schema.sql
   mysql -u root -p feelthemusic_db < seed.sql
   ```
*(Note: If schema.sql and seed.sql are empty in your project, manually create the required tables as per your backend schema).*

## Running the Application

1. **Start the Backend Server:**
   Open a terminal, navigate to the `server` folder, and run:
   ```bash
   npm run dev
   ```

2. **Start the Emotion Microservice:**
   Open a new terminal, navigate to the `emotion-service` folder, and run:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

3. **Start the Frontend Development Server:**
   Open a third terminal, navigate to the `client` folder, and run:
   ```bash
   npm run dev
   ```

## Folder Structure

```text
FeelTheMusic/
├── client/              # React frontend
│   ├── src/             # Frontend source code
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
├── server/              # Node.js backend
│   ├── src/             # Backend source code
│   └── package.json     # Backend dependencies
├── emotion-service/     # Python FastAPI microservice
│   ├── main.py          # Emotion detection logic
│   └── requirements.txt # Python dependencies
└── database/            # SQL scripts for DB setup
    ├── schema.sql
    └── seed.sql
```
