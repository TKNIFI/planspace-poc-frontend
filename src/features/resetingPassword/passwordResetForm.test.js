import React from "react";
import { render } from "@testing-library/react";
import PasswordResetForm from "../forms/passwordResetForm";
test("It Should Renders Password Reset Form", () => {
    render(<PasswordResetForm />);
});
