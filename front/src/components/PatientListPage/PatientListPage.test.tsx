import { useState } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { PatientListItem } from "../../types";
import PatientListPage from "./index";

const initialPatients: PatientListItem[] = [{
  id: "assertion-id",
  name: "Assert Example",
  dateOfBirth: "1990-01-01",
  gender: "male",
  occupation: "Example Occupation",
  rating: 1
}];

function Harness() {
  const [patients, setPatients] = useState(initialPatients);
  return (
    <MemoryRouter>
      <PatientListPage patients={patients} setPatients={setPatients} error="" />
    </MemoryRouter>
  );
}

test("renders the patient list", () => {
  render(<Harness />);

  expect(screen.getByText("Patient list")).toBeInTheDocument();
  expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
  expect(screen.getByRole("columnheader", { name: "Gender" })).toBeInTheDocument();
  expect(screen.getByRole("columnheader", { name: "Occupation" })).toBeInTheDocument();
  expect(screen.getByRole("columnheader", { name: "Health Rating" })).toBeInTheDocument();
  expect(screen.getByText("Assert Example")).toBeInTheDocument();
  expect(screen.getByText("male")).toBeInTheDocument();
  expect(screen.getByText("Example Occupation")).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveAttribute("href", "/assertion-id");
  expect(screen.getByRole("button", { name: "Add New Patient" })).toBeInTheDocument();
});
