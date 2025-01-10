# Installation guide
## Prerequisites
Install Node.js and npm (for the frontend):
- Download and install [Node.JS](https://nodejs.org/en). This will also install npm.
- Verify installation:
```bash
node -v
npm -v
```

## Install Go (for the backend):
- Download and install [Go](https://go.dev/) from golang.org.
- Verify installation:
```bash
go version
```

--- create env file, cd frontend, npm i, npm run dev. go cd backend, go mod tidy, go run main.go (schema will be created when main.go is ran)

## Install MySQL (for the database):
- Download and install [MySQL Community Server](https://dev.mysql.com/downloads/) from MySQL's official website.
Note down the username and password to access the MySQL server when installing

## Install Git (to clone repo):
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
8. Start the backend server
```bash
go run main.go
```
9. Run the Application
Open the frontend in your browser (http://localhost:5173)
Ensure the backend API is accessible (http://localhost:8000)
