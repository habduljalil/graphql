# GraphQL Profile Dashboard

A Vite + React dashboard that authenticates against the Reboot01 platform, fetches profile data from its GraphQL API, and renders a personal progress view with charts for XP, audits, and technical skills.

## What It Does

- Signs users in with Reboot01 credentials using Basic Auth.
- Stores the returned JWT in local storage.
- Protects the profile route when no valid token is present.
- Queries user, audit, skill, level, and project XP data through Apollo Client.
- Renders a dashboard with profile information and multiple data visualizations.

## Stack

- React 18
- Vite 6
- React Router
- Apollo Client
- GraphQL
- Axios
- Recharts
- ESLint

## App Flow

### Routes

- `/` renders the login page.
- `/profile` renders the authenticated dashboard.
- Any unknown route renders the error page.

### Authentication

- Login is handled by a POST request to `https://learn.reboot01.com/api/auth/signin`.
- The dashboard uses the JWT as a Bearer token for GraphQL requests.
- If the token is missing or malformed, the user is redirected back to the login page.

### Data Pulled From GraphQL

- User identity and attributes
- Audit statistics and audit history
- Skill transactions
- Current level
- Project XP transactions

## Dashboard Sections

- Header with logout action
- User information summary
- Audit history list
- Audit overview chart
- Technical skills radar chart
- Project XP bar chart

## Local Development

### Prerequisites

- Node.js 18 or newer
- npm
- A valid Reboot01 account

### Install

```bash
npm install
```

### Start The Dev Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Other Scripts

```bash
npm run build
npm run preview
npm run lint
```

## Important Notes

- The API endpoints are currently hardcoded in the frontend.
- No `.env` setup is required for the current version.
- This project depends on external Reboot01 services, so login and data fetching will only work with valid platform credentials and API availability.

## Project Structure

```text
src/
  auth/
  components/
  hooks/
  pages/
  queries/
  styles/
  utils/
```

## Deployment

The project includes `vercel.json` and is set up for deployment on Vercel.

## Author

Built by Hussain Abduljalil for Reboot01.
