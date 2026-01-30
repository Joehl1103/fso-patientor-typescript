# Patientor

Patientor is a full-stack TypeScript application for managing patient records. The backend exposes a REST API and the frontend provides a React UI for browsing patients and viewing details.

🔗 **Live Demo:** [fso-patientor-typescript.vercel.app](https://fso-patientor-typescript.vercel.app/)

## Features

- View a list of patients with key details
- Browse patient details and entries
- Client-side validation and typed API responses

## Tech stack

### Frontend

- React
- Vite
- TypeScript
- Material UI
- Axios

### Backend

- Node.js
- Express
- TypeScript
- Zod

## Project structure

- `back/` — Express API (TypeScript)
- `front/` — React + Vite client (TypeScript)
- `docs/` — project documentation and plans

## Prerequisites

- Node.js (current LTS recommended)
- npm

You will run the backend and frontend in separate terminals.

## Getting started

1) Install dependencies

```bash
cd back
npm install

cd ../front
npm install
```

2) Start the backend

```bash
cd back
npm run dev
```

3) Start the frontend

```bash
cd front
npm run dev
```

## Scripts

Backend (`back/`):

- `npm run dev` — start API in dev mode
- `npm run build` — build TypeScript
- `npm run start` — run built API
- `npm run lint` — lint
- `npm test` — tests

Frontend (`front/`):

- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle
- `npm run preview` — preview build
- `npm run lint` — lint

## Troubleshooting

- If the frontend reports a ping failure, verify the backend is running and reachable at `/api/ping`.
