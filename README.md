# InkSpace

InkSpace is a modern blogging application that enables users to sign up, sign in, view all blogs, and publish their own blogs. The project is built using **Cloudflare Hono** for the backend, **React** for the frontend, and a common repository for **Zod** validation.

## Features

- **User Authentication**
  - Sign up: Create a new user account.
  - Sign in: Log in with your existing credentials.
- **Blog Management**
  - View all blogs: Browse through a collection of blogs published by various users.
  - Publish a blog: Share your thoughts and ideas by creating a new blog.
- **Validation**
  - Unified validation logic using Zod for consistent data validation across the frontend and backend.

## Tech Stack

### Backend
- **Framework**: [Cloudflare Hono](https://hono.dev/)
- **Language**: TypeScript
- **Features**:
  - Lightweight and high-performance routing.
  - Optimized for serverless environments.

### Frontend
- **Framework**: [React](https://react.dev/)
- **Features**:
  - Interactive UI components.
  - State management using hooks and context.

### Validation
- **Library**: [Zod](https://zod.dev/)
- **Features**:
  - Shared validation logic between frontend and backend.
  - Type-safe schema definitions for consistent data handling.
