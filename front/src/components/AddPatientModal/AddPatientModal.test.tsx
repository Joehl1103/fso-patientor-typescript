import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import AddPatientModal from "./index.tsx";

const onCancel = vi.fn();
const onSubmit = vi.fn();
const onClose = vi.fn();
const user = userEvent.setup();

test("Invalid data displays error message", () => {
	const setError = vi.fn();
  render(<AddPatientModal modalOpen={true} onClose={onCancel} onSubmit={onSubmit} error={"Error"} setError={setError} />);
	const el = screen.getByTestId("modal-alert");
	expect(el).toBeVisible();
	expect(el.textContent).toBe("Error");
});

function Harness() {
	const [error,setError] = useState<string>("Error");
	return <AddPatientModal modalOpen={true} onClose={onClose} onSubmit={onSubmit} error={error} setError={setError}/>;
}

test("clicking on close closes the alert", async () => {
  render(<Harness/>);
	const el = screen.getByTestId("modal-alert");
	const close = within(el).getByRole("button",{ name: /close/i });
	expect(close).toBeVisible();
	await user.click(close);
	expect(screen.queryByRole("button", { name: /close/i })).toBeNull();
});
