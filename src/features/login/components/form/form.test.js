import React from "react";
import { render, screen, cleanup } from "../../../../test-utils.js";
import LoginForm from "./form";

it("should render input element", () => {
  render(<LoginForm />);
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  expect(inputElement).toBeInTheDocument();
});
