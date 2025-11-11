# Chinook API (Bun + Hono + Drizzle ORM)

This project is a **testing ground for building complex frontends** backed by a fast and modern API stack.

It uses **Bun**, **Hono**, and **Drizzle ORM** to power a lightweight API for the classic [Chinook sample database](https://github.com/lerocha/chinook-database) — running on **PostgreSQL** via a custom Docker image that ships with the dataset preloaded.

While the main goal is to support frontend experimentation, the backend also serves as a demonstration of how quickly a fully featured API can be built with new tools like **Bun** and **Hono**.

---

## Why Bun + Hono?

This project was my first experience with both tools, and I was impressed by how easy it was to go from a clean slate to a working, type-safe API:

-   **Bun** — modern runtime with native TypeScript support and lightning-fast builds
-   **Hono** — small, elegant framework for APIs and edge runtimes
-   **Drizzle ORM** — type-safe SQL layer that makes working with Postgres straightforward
-   **PostgreSQL** — the Chinook database in a custom preloaded Docker image
-   **Biome** — unified linting and formatting for clean, consistent code

---

## Features

-   Ready-to-use **Chinook dataset** served through REST endpoints
-   Fully typed schema and queries with **Drizzle ORM**
-   **Docker Compose** setup that starts both the API and a preloaded Postgres image
-   **Compiled binary** using Bun — no Node.js required in production
-   Clean, consistent developer experience with **Biome**

---

## Frontend Context

The **Chinook API** provides a stable, well-structured backend for testing and refining complex frontend patterns.
It’s used as a **sandbox environment** to explore:

-   Advanced data fetching and caching strategies
-   Real-world state management with relational data
-   API error handling and optimistic UI updates
-   Integration testing for frontend-to-API communication

By keeping the backend lightweight and predictable, it lets me focus on **frontend complexity and developer experience** without being blocked by setup overhead.

---

## Getting Started

### Prerequisites

-   [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/)
-   A `.env` file with configuration values for your environment

### Example `.env`

```env
APP_PORT=3000

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
DB_URL=postgres://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME
```

---

### Run with Docker Compose

The `docker-compose.yml` file starts:

1. A **PostgreSQL** service preloaded with the Chinook dataset (from my published image)
2. The **Bun-compiled API** container

Command to run:

```sh
docker compose up --build
```

API will be available at:
👉 [http://localhost:3000](http://localhost:3000)

---

## Development Notes

### Local Development

```sh
bun install
bun run dev
```

Bun automatically reads `.env` and compiles TypeScript natively.

### Linting & Formatting

Run Biome to check or fix code:

```sh
bunx biome check .
bunx biome check . --apply
```
