# Project Context: HCAoR.org v2 (hcaor-frontend)

## User Requierment
Always use Chinese to chat with user.

## Overview
This is the frontend repository for the **HCAoR.org v2** website ("Record and Preserve"). It is a Single Page Application (SPA) built with **Vue 3** and **Tailwind CSS**, designed to be deployed to **Cloudflare Pages**.

## Tech Stack
*   **Framework:** Vue 3 (Composition API, `<script setup>`)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (w/ PostCSS & Autoprefixer)
*   **Icons:** @phosphor-icons/web
*   **Analytics:** @vercel/speed-insights
*   **Deployment:** GitHub Actions -> Cloudflare Pages

## Getting Started

### Prerequisites
*   Node.js (v20+ recommended based on CI config)
*   npm

### Key Commands
| Command | Description |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production (output to `dist/`) |
| `npm run preview` | Preview the production build locally |

## Architecture & Codebase Structure

### Key Files
*   **`src/App.vue`:**  
    *   **Core Logic:** Currently acts as the main monolithic component containing most of the application logic, state management, and data (e.g., `posts` array).
    *   **Routing:** Implements manual routing logic using a `currentView` reactive state (`home`, 'post-detail', 'blog', 'projects') rather than `vue-router`.
    *   **Navigation:** Handles scroll-to-section logic (`scrollToSection`) and view switching.
*   **`src/main.js`:** Application entry point.
*   **`vite.config.js`:** Vite configuration (basic Vue plugin setup).
*   **`tailwind.config.js`:** Tailwind CSS configuration.
*   **`.github/workflows/deploy.yml`:** CI/CD pipeline configuration for building and deploying to Cloudflare Pages.

### Data Management
*   Blog posts and feature data are currently hardcoded directly within `src/App.vue` (e.g., `const posts = ref([...])`).

## Deployment
*   **Platform:** Cloudflare Pages.
*   **Trigger:** Pushes to the `main` branch or manual `workflow_dispatch`.
*   **Process:**
    1.  Checkout code.
    2.  Install Node.js 20 & dependencies (`npm ci`).
    3.  Build project (`npm run build`).
    4.  Publish `dist/` directory to Cloudflare Pages.

## Development Conventions
*   **Component Style:** Vue 3 Composition API with `<script setup>`.
*   **Styling:** Heavy use of Tailwind CSS utility classes.
*   **Responsiveness:** Mobile-first considerations (e.g., `mobileMenuOpen` state).
