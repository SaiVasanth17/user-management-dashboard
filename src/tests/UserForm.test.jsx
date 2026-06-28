import { render, screen } from "@testing-library/react";
import UserForm from "../components/UserForm/UserForm";
import { vi } from "vitest";

test("renders add user modal", () => {
  render(
    <UserForm
      isOpen={true}
      editingUser={null}
      onClose={vi.fn()}
      onSave={vi.fn()}
    />
  );

  expect(
    screen.getByText(/add user/i)
  ).toBeInTheDocument();
});