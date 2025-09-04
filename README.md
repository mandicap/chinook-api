# Chinook API (Bun + Hono + Drizzle ORM)

A lightweight, blazing-fast REST API for the classic [Chinook sample database](https://github.com/lerocha/chinook-database), built with:

-   [**Bun**](https://bun.sh/) – modern JavaScript runtime with native bundling & compilation
-   [**Hono**](https://hono.dev/) – ultrafast web framework for edge & server runtimes
-   [**Drizzle ORM**](https://orm.drizzle.team/) – type-safe, SQL-first ORM
-   [**PostgreSQL**](https://www.postgresql.org/) – relational database backend
-   [**Biome**](https://biomejs.dev/) – linter, formatter, and code quality toolkit

This project demonstrates how to build a **compiled, containerized API** that’s fast, type-safe, and production-ready.

---

## Features

-   🚀 Bun-compiled executable — no Node.js required in production
-   ⚡ Minimal & fast HTTP routing with Hono
-   🗄️ Strongly typed schema and queries with Drizzle ORM
-   🐘 Backed by PostgreSQL (Chinook sample DB)
-   🛠️ Dockerfile for reproducible builds and deployment
-   ✨ Biome for consistent linting & formatting

---

## Getting Started

### Prerequisites

-   [Docker](https://docs.docker.com/get-docker/) installed
-   Access to a PostgreSQL database loaded with the Chinook sample data
