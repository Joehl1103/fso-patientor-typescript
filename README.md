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
- `npm run build` — typecheck with `tsc`, then build the production bundle
- `npm run preview` — preview build
- `npm run lint` — lint
- `npm test` — run Vitest

## Testing

Backend tests use Node's built-in `node:test` runner through `ts-node-test`. Supertest calls the Express app in process, so the API does not need to be running. From `back/`:

```bash
npm test
```

Frontend tests use Vitest in jsdom with React Testing Library. From `front/`:

```bash
npm test
```

Component tests cover the patient list, the add-patient form, and the add-patient modal. `validateNewPatient` is tested without the network. Diagnosis lookup, fetching diagnoses for an entry, and creating a patient call the API at `VITE_API_BASE_URL`, or `http://localhost:3000/api` when that variable is unset. Start the backend before those tests.

## Frontend styles

Component styles live in a colocated `*.module.css` file and are applied as `className={styles.className}`.

Material UI gives each component a class, usually `MuiComponent-root`, and gives inner pieces a slot class such as `MuiRating-iconFilled`. Those rules are injected when the component renders. A CSS module class is also a single class. When both rules set the same property, the later stylesheet wins, and that is usually Material UI.

Override the MUI class when the property you are changing is one that class already sets. Common cases are margin and padding on typography, labels, buttons, and checkboxes; borders on dividers; flex direction on groups; and color on icons. Pair your class with the MUI class so the selector is more specific:

```css
.title:global(.MuiTypography-root) {
  margin-bottom: 12px;
}
```

`:global` keeps the `Mui*` name from being hashed. The element must carry both classes.

A plain module class is enough when that component does not set the property. A `Box` does not set `display: flex`. A width on a control that has no width rule does not need the MUI class.

Use a descendant `:global` when the node is inside the component and you cannot put your class on it:

```css
.rating :global(.MuiRating-iconFilled) {
  color: #ff6d75;
}
```

To decide, inspect the element. If a `Mui*` class on that node, or on the inner node you mean to change, already declares the property, add that class with `:global`. Slot names are listed in the component's CSS API. Only the slot you are changing needs the override.

## Troubleshooting

- If the frontend reports a ping failure, verify the backend is running and reachable at `/api/ping`.
