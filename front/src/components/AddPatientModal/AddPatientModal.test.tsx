import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import AddPatientModal from "./index.tsx";

const onCancel = vi.fn();
const onSubmit = vi.fn();

test("Invalid data displays error message", () => {
  render(<AddPatientModal modalOpen={true} onClose={onCancel} onSubmit={onSubmit} error={"Error"} />);
	const el = screen.getByTestId("modal-alert");
	expect(el).toBeVisible();
	expect(el.textContent).toBe("Error");
});
