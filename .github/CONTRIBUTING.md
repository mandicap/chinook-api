# Contributing Guide

First off, thank you for your interest in contributing!
This project is designed as both a **learning sandbox** and a **testbed** for building modern, authenticated APIs using Bun, Hono, Drizzle ORM, and Better Auth.
Contributions that improve code quality, extend examples, or help refine the developer experience are always welcome.

---

## Environment Setup

This project uses **[Bun](https://bun.sh)** as both the runtime and the package manager.
Make sure Bun is installed before proceeding:

```bash
curl -fsSL https://bun.sh/install | bash
```

Clone the repository and install dependencies:

```bash
git clone https://github.com/mandicap/chinook-api.git
cd chinook-api
bun install
```

---

## Local Development

1. Install dependencies (if you haven’t already):

    ```bash
    bun install
    ```

2. Copy `.env.example` as `.env`

    ```bash
    cp .env.example .env
    ```

3. Start only the database container in detached mode:

    ```bash
    docker compose up -d db
    ```

4. Run database migrations using Drizzle:

    ```bash
    bunx drizzle-kit migrate
    ```

5. Start the development server:
    ```bash
    bun run dev
    ```

This command runs the API with Hono, Drizzle, and Better Auth active, using environment variables from your `.env` file.

---

## Code Quality

This project uses **[Biome](https://biomejs.dev)** for both linting and formatting.
Before opening a pull request, ensure your code is clean and consistent:

```bash
bunx biome check .
bunx biome check . --apply
```

PRs that don’t pass Biome checks will be requested to fix before merging.

---

## Commit Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification to keep commit
messages consistent and automation-friendly.

### Format

Each commit message should follow this general structure:

```
<type>[optional scope]: <description>
```

#### Examples

Without scope:

```text
feat: add support for multiple manifest files
```

With scope:

```text
fix(tests): correct missing CSS assertion in asset output
```

#### Common Types found in project

| Type       | Description                                    |
| ---------- | ---------------------------------------------- |
| `feat`     | A new feature                                  |
| `fix`      | A bug fix                                      |
| `docs`     | Documentation-only changes                     |
| `test`     | Adding or improving tests                      |
| `chore`    | Maintenance or tooling changes                 |
| `refactor` | Code refactors that don’t affect functionality |
| `style`    | Code style or formatting-only changes          |

Following this format helps with automated changelogs, semantic versioning, and clearer project history.

---

## Testing

Testing coverage is still being developed; the intention is to use Bun’s native testing framework.

Contributors are encouraged to add test cases for new endpoints or features, especially around authentication, route protection, and database queries.

---

## Submitting a Pull Request

1. Fork the repository and create your branch:
    ```bash
    git checkout -b feat/new-endpoint
    ```
2. Make your changes and ensure lint/test checks pass:
    ```bash
    bunx biome check .
    bun test
    ```
3. Commit your changes following conventional commit style.
4. Push to your fork and open a Pull Request describing your change.

Please include relevant context, screenshots (if applicable), and reference any related issues.

---

## Contribution Guidelines

-   Keep code **type-safe** and consistent with the existing Drizzle setup.
-   **Document new routes** in the README if they’re part of the API surface.
-   Don’t introduce new dependencies without discussion.
-   Security-sensitive changes (especially around auth) should be discussed via issue first.
-   Be mindful that this repository also serves as a **learning tool**, so clarity in examples is valued as much as functionality.
