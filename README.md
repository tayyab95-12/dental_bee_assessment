# Note Taking Application

This is a full-stack note-taking application with integrated audio recording functionality. The application is built using **React** for the frontend and **Django REST Framework** for the backend, with **PostgreSQL** as the database. It features user authentication, daily note management, and the ability to record audio notes.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project](#running-the-project)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [API Endpoints](#api-endpoints)
  - [Backend API Endpoints](#backend-api-endpoints)
  - [Frontend API Usage](#frontend-api-usage)
- [License](#license)

## Features

- User registration and login functionality with JWT authentication.
- Create, read, update, and delete (CRUD) daily notes.
- Each note can have a title, description, and audio recording.
- Protected routes for authenticated users only.
- Responsive design for better user experience.

## Technologies Used

- **Frontend**: React, React Router, Axios, React Toastify
- **Backend**: Django, Django REST Framework, PostgreSQL
- **Other**: Docker for containerization

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/get-started)
- [Python](https://www.python.org/downloads/) (v3.11 or later)
- [PostgreSQL](https://www.postgresql.org/download/) (or you can use Docker to run PostgreSQL)

### Clone the Repository

```bash
git clone https://github.com/yourusername/note-taking-app.git
cd note-taking-app
```


## Dockerized Setup
1. Navigate to the project root (where docker-compose.yml is located) and run the following command to build and start the containers:
```bash
docker-compose up --build
```
2. Docker will automatically set up the PostgreSQL database and run the Django and React applications.
3. After all the containers are up, connect the terminal of backend container using the command:
```bash
docker exec -it <mycontainer> /bin/bash
```
4. And run the following command, to migrate the database:
```bash
python manage.py migrate
```
5. After that in order to create user run the following command and provide respective information:
```bash
python manage.py createsuperuser
```
## Running the Project

After running the above command, the following services will be available:

	•	Backend: The Django REST API will be accessible at http://localhost:8000/api/
	•	Frontend: The React application will be accessible at http://localhost:3000

You can stop the services at any time by pressing Ctrl + C in the terminal where you ran docker-compose up.

## API Endpoints

Backend API Endpoints

- Authentication 
  - POST /api/token/ - Obtain JWT token for login. 
    - Request body: { "email": "user@example.com", "password": "yourpassword" } 
  - POST /api/token/refresh/ - Refresh JWT token. 
- Notes 
  - GET /api/notes/ - Retrieve all notes for the authenticated user. 
  - POST /api/notes/ - Create a new note. 
    - Request body: { "title": "Note Title", "description": "Note Description", "recording_file": "audioFileUrl" } 
  - GET /api/notes/{id}/ - Retrieve a specific note. 
  - PUT/PATCH /api/notes/{id}/ - Update a specific note. 
    - Request body: { "title": "Updated Title", "description": "Updated Description", "recording_file": "audioFileUrl" } 
  - DELETE /api/notes/{id}/ - Delete a specific note.

## Frontend API Usage

The frontend communicates with the backend using Axios for making HTTP requests. Here are the key functions:

- Login 
  - Call POST /api/token/ with user credentials to log in and obtain a JWT token. 
- Notes Management 
  - Fetch notes using GET /api/notes/. 
  - Create a note with POST /api/notes/. 
  - Edit a note using PUT /api/notes/{id}/. 
  - Delete a note using DELETE /api/notes/{id}/.

