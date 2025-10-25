# Github Profile Viewer

Discover GitHub profiles, stats, and external links through a clean, animated interface built with vanilla HTML, CSS, and JavaScript.

## Live Demo

- https://yofukashiya.github.io/GithubProfileViewer/

## Features

- Search for any public GitHub username and display their profile instantly.
- Show key stats including repositories, followers, following, and gists with localized formatting.
- Display avatars, bios, locations, and optional blog links when available.
- Smooth loading states, empty-state handling, and informative error messaging for rate limits or missing users.
- Responsive layout with subtle motion effects for a polished experience on desktop and mobile.

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in your preferred browser, or serve the folder with a lightweight web server (e.g., `npx serve` or `python -m http.server`).
3. Enter any GitHub username in the search bar and hit **Search** (or press Enter) to fetch the profile.

> **Note:** The app uses the public GitHub REST API. Unauthenticated requests are rate-limited to 60 per hour per IP. If you see a rate-limit error, wait a bit and try again.

## Project Structure

```
GithubProfileViewer/
├── index.html   # Markup for the single-page app
├── style.css    # Styling and responsive layout
└── index.js     # Fetch logic, rendering, and UI state management
```
