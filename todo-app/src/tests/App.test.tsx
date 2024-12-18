import React from "react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";

import "@testing-library/jest-dom";
import "jest-styled-components";

import App from "../components/App";

jest.mock("axios");

const mockTodos = [
  { id: "1", description: "Run LA marathon", isComplete: false, dueDate: "2023-03-21" },
  { id: "2", description: "Call Mom", isComplete: false, dueDate: "2023-06-26" },
  { id: "3", description: "Feed the cat", isComplete: true, dueDate: "2023-03-10" },
  { id: "4", description: "Walk the dog", isComplete: false, dueDate: null },
];

beforeEach(async () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockTodos });
  await act(async () => {
    render(<App />);
  });
});


test("renders Todo App header", () => {
  const headerElement = screen.getByText(/Todo App/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders all todo items", async () => {
  mockTodos.forEach((todo) => {
    const todoDescription = screen.getByText(todo.description);
    expect(todoDescription).toBeInTheDocument();
  });
});

test("checkbox toggles completion status", async () => {
  (axios.patch as jest.Mock).mockResolvedValue({});

  const checkbox = await screen.findByLabelText("Run LA marathon");

  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);

  await waitFor(() => {
    expect(checkbox).toBeChecked();
  });

  fireEvent.click(checkbox);

  await waitFor(() => {
    expect(checkbox).not.toBeChecked();
  });
});

test("displays overdue and days left correctly", async () => {
  const overdueCheckbox = screen.getByLabelText(/Run LA marathon/i);

  const listItem = Array.from(screen.getAllByRole("listitem")).find((li) =>
      li.textContent?.includes("Run LA marathon")
  );

  expect(listItem).toHaveStyle("background-color: #f8d7da");

  const daysLeftItem = screen.getByText(/Call Mom/i);
  expect(daysLeftItem).toBeInTheDocument();

  expect(overdueCheckbox).not.toBeChecked();
});


test("clears due date when clicking clear icon", async () => {
  const clearButtons = screen.getAllByLabelText("Close");
  fireEvent.click(clearButtons[0]);

  await waitFor(() => {
    const inputBox = screen.queryByDisplayValue("03/21/2023");
    expect(inputBox).not.toBeInTheDocument();
  });
});


