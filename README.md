# Threadly
A web forum developed for CVWO Winter Assignment AY2425. Threadly is designed for NUS computing students to foster discussions and exchange ideas on various topics. <br>
Name: Mai Kai Ler <br>
Data of submission: 26/01/25

## Tech Stack
| Component| Tech |
| ----------- | ----------- |
| Frontend| React with Typescript|
| Backend | Go |
| Database | MySQL |
| Misc | Adobe Express (website logo) |

## Features
- An authentication system where users are authenticated by their user name and password.
- The ability to perform basic CRUD operations for forum threads and comments. CRUD is an acronym for Create, Read, Update and Delete.
- A category/tagging system to categorise threads so that they are easier to search for through filtering.

---

# Installation guide
## Prerequisites
### Install Node.js and npm (for the frontend):
- Download and install [Node.JS](https://nodejs.org/en). This will also install npm.
- Verify installation:
```bash
node -v
npm -v
```

### Install Go (for the backend):
- Download and install [Go](https://go.dev/) from golang.org.
- Verify installation:
```bash
go version
```

### Install MySQL (for the database):
- Download and install [MySQL Community Server](https://dev.mysql.com/downloads/) from MySQL's official website.
Note down the username and password to access the MySQL server when installing

### Install Git (to clone repo):
- Download and install [Git](https://git-scm.com/downloads).

## Steps to Set Up the Application
1. Cloning the repository
```bash
git clone https://github.com/TOBECHANGED
```
2. Change into frontend directory
```bash
cd frontend
```
3. Install dependencies
```bash
npm install
```
4. Start the development server
```bash
npm run dev
```
5. Set Up the Backend
```bash
cd ../backend
go mod tidy
```
6. Create a .env file from the template .env.example file.
```bash
cp .env.example .env
```
7. Edit the .env according to the instructions in the template
  - Schema will be created according to DB_NAME specified
8. Start the backend server
```bash
go run main.go
```
9. Run the Application <br>
Open the frontend in your browser (http://localhost:5173) <br>
Ensure the backend API is accessible (http://localhost:8000)
