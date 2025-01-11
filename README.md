# Node.js Dockerized App

[![Node.js](https://img.shields.io/badge/Node.js-v22-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4-blue?logo=express)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-%23ffffff.svg?logo=docker&logoColor=2496ED)](https://www.docker.com/)
[![Redis](https://img.shields.io/badge/Redis-v7-red?logo=redis)](https://redis.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6-green?logo=mongodb)](https://www.mongodb.com/)
![License](https://img.shields.io/github/license/abdorrahmani/nodejs-dockerized-app)
[![Website](https://img.shields.io/badge/Website-Online-brightgreen?style=flat&logo=google-chrome)](https://anophel.com)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

A simple Node.js application built with Express.js, Redis, and MongoDB, fully containerized using Docker and Docker Compose.

---

## Features
- 🛠 **Express.js**: Lightweight framework for building web applications.
- 🐋 **Dockerized**: Fully containerized with `docker-compose`.
- 🗃 **MongoDB**: NoSQL database for data storage.
- 🚀 **Redis**: In-memory data store for caching.
- 🔄 **Hot-Reload**: Automatic reloading in development with `nodemon`

---

## Prerequisites

- [Node.js](https://nodejs.org/) (if running locally)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/abdorrahmani/nodejs-dockerized-app.git
cd nodejs-dockerized-app
```

### 2. Environment Variables

Ensure the following environment variables are set in `docker-compose.yml`:

```yaml
environment:
  REDIS_URL: redis://redis:6379
  MONGO_URL: mongodb://mongo:27017
```

### 3. Run the App

#### Using Docker Compose

```bash
docker-compose up --build
```

#### Access the App

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Locally (Without Docker)

#### Install Dependencies

```bash
npm install
```

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm start
```

---

## File Structure

```plaintext
nodejs-dockerized-app/
├── app.js                 # Main application logic
├── Dockerfile             # Docker image configuration
├── docker-compose.yml     # Docker Compose configuration
├── nodemon.json           # Nodemon configuration
├── package.json           # Node.js project metadata
└── README.md              # Project documentation
```

---

## Scripts

| Command       | Description                  |
|---------------|------------------------------|
| `npm start`   | Run the app in production    |
| `npm run dev` | Run the app in development   |
---

## Technologies Used

- **Node.js**: Runtime for JavaScript.
- **Express.js**: Web framework.
- **Redis**: In-memory data structure store.
- **MongoDB**: NoSQL database.
- **Docker**: Containerization platform.

---

## Troubleshooting

- Ensure `Docker Desktop` and `WSL2` are properly configured if using Windows.
- Check the logs of the containers for debugging:

```bash
docker logs <container_name>
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you find bugs or have suggestions.

---

## Acknowledgements

Thanks to the developers of [Node.js](https://nodejs.org/), [Redis](https://redis.io/), [MongoDB](https://www.mongodb.com/), and the [Docker](https://www.docker.com/) community for their awesome tools.
