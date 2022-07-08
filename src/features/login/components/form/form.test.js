import { render, screen } from "@testing-library/react";
import React from "react";

import LoginForm from "./form";
test("should render input element", () => {
  render(<LoginForm />);
  const inputElement = screen.getByPlaceholderText(/enter your email/i);
  expect(inputElement).toBeInTheDocument();
});
