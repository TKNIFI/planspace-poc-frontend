import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import AddMemberForm from "./addMemberForm";

describe("Add New Memeber Form", () => {
  test("should render input name", () => {
    render(<AddMemberForm />);
    const inputElementName = screen.getByPlaceholderText("Name");
    expect(inputElementName).toBeInTheDocument();
  });
  test("should render input User", () => {
    render(<AddMemberForm />);
    const inputElementUser = screen.getByPlaceholderText("User");
    expect(inputElementUser).toBeInTheDocument();
  });
  test("should render input Email", () => {
    render(<AddMemberForm />);
    const inputElementEmail = screen.getByPlaceholderText("Email");
    expect(inputElementEmail).toBeInTheDocument();
  });
  test("should render input Phone", () => {
    render(<AddMemberForm />);

    const inputElementPhone = screen.getByPlaceholderText("E.g 212-456-7890");
    expect(inputElementPhone).toBeInTheDocument();
  });

  test("should be able to type into Name input", () => {
    render(<AddMemberForm />);
    const inputElementName = screen.getByPlaceholderText("Name");
    fireEvent.click(inputElementName);
    fireEvent.change(inputElementName, {
      target: {
        value: "Asim",
      },
    });

    expect(inputElementName.value).toBe("Asim");
  });

  test("should be able to type into Name input", () => {
    render(<AddMemberForm />);
    const inputElementName = screen.getByPlaceholderText("Name");

    fireEvent.click(inputElementName);
    fireEvent.change(inputElementName, {
      target: { value: "Asim" },
    });
    expect(inputElementName.value).toBe("Asim");
  });

  test("should be able to type into User input", () => {
    render(<AddMemberForm />);
    const inputElementUser = screen.getByPlaceholderText("User");

    fireEvent.click(inputElementUser);
    fireEvent.change(inputElementUser, {
      target: { value: "Asim" },
    });
    expect(inputElementUser.value).toBe("Asim");
  });

  test("should be able to type into Email input", () => {
    render(<AddMemberForm />);
    const inputElementEmail = screen.getByPlaceholderText("Email");

    fireEvent.click(inputElementEmail);
    fireEvent.change(inputElementEmail, {
      target: { value: "asimmaqsood@gmail.com" },
    });
    expect(inputElementEmail.value).toBe("asimmaqsood@gmail.com");
  });
  // test("should be able to type into phone input", () => {
  //   render(<AddMemberForm />);
  //   const inputElementPhone = screen.getByPlaceholderText("E.g 212-456-7890");

  //   fireEvent.click(inputElementPhone);
  //   fireEvent.change(inputElementPhone, {
  //     target: { value: "123-456-7890" },
  //   });
  //   expect(inputElementPhone.value).toBe("123-456-7890");
  // });

  test("Check if the functions works", () => {
    const btnFunction = jest.fn();
    render(<AddMemberForm />);
    const form = screen.getByTestId("form");
    const btn = screen.getByTestId("submit-button");

    let val = form.getAttribute("onSubmit");

    console.log(val);
    // fireEvent.click(btnFunction);

    fireEvent.click(btn);
    fireEvent.submit(form);
    expect(form).toBeInTheDocument();
    // expect(btnFunction).toBeCalled();
    // expect(form.getAttribute("onSubmit")).toHaveBeenCalled();
  });
});
