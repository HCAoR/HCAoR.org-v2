# Project Context: HCAoR.org v2 (hcaor-frontend)

## User Requierment
Always use Chinese.

## Overview
This is the frontend repository for the **HCAoR.org v2** website ("Record and Preserve"). It is a **Multi-Page Application (SPA)** built with **Vue 3**, **Vue Router**, and **Tailwind CSS**. It is designed for deployment on **Cloudflare Pages**.

## Tech Stack
*   **Framework:** Vue 3 (Composition API, `<script setup>`)
*   **Routing:** Vue Router 4 (History Mode)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (w/ PostCSS & Autoprefixer)
*   **Icons:** @phosphor-icons/web
*   **Syntax Highlighting:** highlight.js (Atom One Dark theme)
*   **Analytics:** @vercel/speed-insights
*   **Deployment:** GitHub Actions -> Cloudflare Pages

## Architecture

### Directory Structure
*   **`src/views/`**: Page-level components.
    *   `HomeView.vue`: Landing page with Hero, About, Projects (anchor links), and Latest Blog posts.
    *   `BlogListView.vue`: Full list of blog posts.
    *   `BlogPostView.vue`: Individual blog post detail page with code highlighting, printing, and sharing features.
    *   `DemoView.vue`: Demonstration page for code block styles (`/demo`).
    *   `NotFoundView.vue`: Custom 404 error page.
*   **`src/components/`**: Reusable UI components.
    *   `TheNavbar.vue`: Responsive navigation bar.
    *   `TheFooter.vue`: Site footer.
*   **`src/composables/`**: Shared state and logic.
    *   `usePosts.js`: centralized fetching and state management for blog posts.
    *   `useCodeHighlight.js`: Logic for syntax highlighting and enhancing code blocks (copy button, language labels).
*   **`src/router/`**: Routing configuration (`index.js`).
*   **`public/`**: Static assets.
    *   `_redirects`: Configuration for Cloudflare Pages SPA routing (resolves 404s on refresh).

### Key Features
*   **Routing:** 
    *   Standard path-based routing (`/`, `/blog`, `/post/:id`).
    *   Smooth scrolling behavior for hash links (e.g., `#about-section`) and page transitions.
    *   Catch-all 404 route.
*   **Blog System:**
    *   Fetches data from `https://api.hcaor.org/api/posts`.
    *   **Syntax Highlighting:** Supports standard Markdown code blocks and custom HTML `<code lang="..." size="block">` format. Includes "Mac-style" window dots, language labels, and copy-to-clipboard buttons.
    *   **Print Optimization:** Custom print styles (`@media print`) that enforce black-on-white text, hide UI elements, and optimize layout for paper.
    *   **Sharing:** Dropdown menu to copy link or print page.
    *   **Error Handling:** Displays user-friendly error messages with status codes if the API fails.

## Getting Started

### Prerequisites
*   Node.js (v20+ recommended)
*   npm

### Key Commands
| Command | Description |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production (output to `dist/`) |
| `npm run preview` | Preview the production build locally |

## Development Conventions
*   **Component Style:** Vue 3 Composition API with `<script setup>`.
*   **Styling:** 
    *   Tailwind CSS utility classes for layout and design.
    *   `src/style.css` for global overrides, animation keyframes, and complex print styles.
*   **Routing:** Use `router.push()` for navigation; ensure anchor links handled by `handleNavigate` in `App.vue` or `scrollTo` in views for smooth scrolling.
*   **Deployment:** The `public/_redirects` file is critical for SPA routing on static hosts.
