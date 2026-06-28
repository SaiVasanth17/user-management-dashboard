import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SearchBar from "../components/SearchBar/SearchBar";

test("renders search input", () => {
  render(
    <SearchBar
      searchTerm=""
      setSearchTerm={vi.fn()}
    />
  );

  expect(
    screen.getByPlaceholderText(/search by name/i)
  ).toBeInTheDocument();
});

test("updates input value", async () => {
  const user = userEvent.setup();
  const setSearchTerm = vi.fn();

  render(
    <SearchBar
      searchTerm=""
      setSearchTerm={setSearchTerm}
    />
  );

  const input = screen.getByPlaceholderText(/search by name/i);

  await user.type(input, "Sai");

  expect(setSearchTerm).toHaveBeenCalled();
});