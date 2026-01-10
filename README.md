# Assignment 3 live servire
## Production URL

You can access the **osFreshCart** project in production using the following link:
[osfreshcart-production.up.railway.app](https://osfreshcart-production.up.railway.app)



# Assignment 2  Docker & GitHub Basics (Practical)

## Student Information
- **Name:** Ramzy Zakout  
- **Course:** OS Lab / Software Engineering  
- **Assignment:** Docker & GitHub Basics  

---

## Project Description
This project is a web application called **FreshCart**.  
The goal of this assignment is to containerize the project using **Docker**
and publish it professionally on **GitHub**.

The application is built using **Node.js** and **Vite**, and it runs inside
a Docker container without requiring any local dependencies.

---

## Technologies Used
- Node.js
- Vite
- Docker
- Git & GitHub

---


---

## How to Run the Project (Using Docker)

### 1. Build Docker Image
```bash
docker build -t freshcart .

### 2. run Docker Container
docker run -p 5173:5173 freshcart

### 3. open in Browser
http://localhost:5173
