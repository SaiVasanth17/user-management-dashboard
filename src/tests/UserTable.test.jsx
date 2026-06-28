import { render, screen } from "@testing-library/react";
import UserTable from "../components/UserTable/UserTable";
import { vi } from "vitest";

const users = [
  {
    id: 1,
    firstName: "Sai",
    lastName: "Vasanth",
    email: "sai@gmail.com",
    department: "IT",
  },
];

test("renders user data", () => {
  render(
    <UserTable
      users={users}
      onEdit={vi.fn()}
      onDelete={vi.fn()}
      onSort={vi.fn()}
    />
  );

  expect(screen.getByText("Sai")).toBeInTheDocument();
  expect(screen.getByText("IT")).toBeInTheDocument();
});