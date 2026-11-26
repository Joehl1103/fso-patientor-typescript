import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Gender } from "../../types";
import AddPatientForm from "./AddPatientForm";


const onSubmit = vi.fn();

test("submits the entered patient", () => {
	const onCancel = vi.fn();
  render(<AddPatientForm onCancel={onCancel} onSubmit={onSubmit} />);

  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("Social security number"), {
    target: { value: "123-456-7890" },
  });
  fireEvent.change(screen.getByLabelText("Date of birth"), {
    target: { value: "1990-01-02" },
  });
  fireEvent.change(screen.getByLabelText("Occupation"), {
    target: { value: "Doctor" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Add" }));

  expect(onSubmit).toHaveBeenCalledWith({
    name: "John Doe",
    occupation: "Doctor",
    ssn: "123-456-7890",
    dateOfBirth: "1990-01-02",
    gender: Gender.Male,
  });
  expect(onCancel).not.toHaveBeenCalled();


});


