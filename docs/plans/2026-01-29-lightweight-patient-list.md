# Lightweight Patient List Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the initial patient list endpoint return only fields needed for the list view (id, name, gender, occupation), and update the frontend types/requests accordingly.

**Architecture:** Replace the patient list response with a lightweight shape (`NonSensitivePatient` without `entries`), leaving the detailed patient endpoint unchanged. Frontend list state will use the lightweight type and only request full patient data on the patient detail page.

**Tech Stack:** TypeScript, React, Express, Axios.

---

### Task 1: Update backend list response to exclude entries

**Files:**
- Modify: `back/src/services/patientsService.ts`
- Modify: `back/src/routes/patientsRoute.ts`
- Modify: `back/src/data/types.ts`

**Step 1: Write the failing test**

If a test framework exists, add a test for `/api/patients` to assert the response objects do not include `entries`.

```ts
// tests/patients.test.ts (example)
const response = await request(app).get('/api/patients');
expect(response.body[0].entries).toBeUndefined();
```

**Step 2: Run test to verify it fails**

Run: `npm test` (or project-specific test command if available)
Expected: FAIL because response includes `entries`.

**Step 3: Write minimal implementation**

- Introduce a `PatientListItem`/`PatientListEntry` type that omits `entries` (and `ssn`) from the list response. Use this type in the list endpoint.
- Update `getPatientsWithoutSsns` to only include `id`, `name`, `gender`, `occupation` (and optionally `dateOfBirth` if needed later).

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

**Step 5: Commit**

```bash
git add back/src/services/patientsService.ts back/src/routes/patientsRoute.ts back/src/data/types.ts tests/patients.test.ts
git commit -m "perf: make patient list lightweight"
```

### Task 2: Update frontend types and list fetch to use lightweight type

**Files:**
- Modify: `front/src/types.ts`
- Modify: `front/src/services/patients.ts`
- Modify: `front/src/App.tsx`
- Modify: `front/src/components/PatientListPage/index.tsx`

**Step 1: Write the failing test**

If frontend tests exist, add a type-level assertion or component test that expects list items to not require `entries`.

```ts
// Example (type-level)
const listItem: PatientListItem = { id, name, gender, occupation };
```

**Step 2: Run test to verify it fails**

Run: `npm test` (or `pnpm test`/`yarn test` based on project setup)
Expected: FAIL because types still require `entries`.

**Step 3: Write minimal implementation**

- Add a list type to `front/src/types.ts` that omits `entries` and `ssn`.
- Update `patientService.getAll()` to return `PatientListItem[]`.
- Update `App.tsx` state to use `PatientListItem[]` and adjust props in `PatientListPage` accordingly.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

**Step 5: Commit**

```bash
git add front/src/types.ts front/src/services/patients.ts front/src/App.tsx front/src/components/PatientListPage/index.tsx
git commit -m "refactor: use lightweight patient list type"
```

### Task 3: Manual verification

**Files:**
- None

**Step 1: Run the app**

Run backend and frontend (commands from README/package.json).

**Step 2: Verify behavior**

- Load `/` and confirm patient list renders quickly.
- Open a patient detail page and confirm entries still load properly.
- Confirm `/api/patients` response does not include `entries`.

**Step 3: Commit**

No commit unless verification changes code.
