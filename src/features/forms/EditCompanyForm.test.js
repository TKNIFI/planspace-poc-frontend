import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import EditCompanyfrom from "./EditCompanyfrom";

describe("Edit  Memeber Form", () => {
  test("should render input name", () => {
    render(<EditCompanyfrom />);
    const inputElementName = screen.getByPlaceholderText(
      /Enter the business name/i
    );
    expect(inputElementName).toBeInTheDocument();
  });
  test("should render input User", () => {
    render(<EditCompanyfrom />);
    const inputElementEmail = screen.getByPlaceholderText(
      "Enter email address"
    );
    expect(inputElementEmail).toBeInTheDocument();
  });
  test("should render input Address line 1", () => {
    render(<EditCompanyfrom />);
    const inputElementAdd1 = screen.getByPlaceholderText("Address line 1");
    expect(inputElementAdd1).toBeInTheDocument();
  });
  test("should render input Address line 2", () => {
    render(<EditCompanyfrom />);
    const inputElementAdd2 = screen.getByPlaceholderText("Address line 2");
    expect(inputElementAdd2).toBeInTheDocument();
  });
  test("should render input City", () => {
    render(<EditCompanyfrom />);

    const inputElementCity = screen.getByPlaceholderText("City");
    expect(inputElementCity).toBeInTheDocument();
  });
  test("should render input State", () => {
    render(<EditCompanyfrom />);

    const inputElementState = screen.getByPlaceholderText("State");
    expect(inputElementState).toBeInTheDocument();
  });
  test("should render input Zip Code", () => {
    render(<EditCompanyfrom />);

    const inputElementZip = screen.getByPlaceholderText("Zip code");
    expect(inputElementZip).toBeInTheDocument();
  });
  test("should render input phone", () => {
    render(<EditCompanyfrom />);

    const inputElementZip = screen.getByPlaceholderText("Enter phone number");
    expect(inputElementZip).toBeInTheDocument();
  });

  test("should be able to type into business Name input", () => {
    render(<EditCompanyfrom />);
    const inputElementName = screen.getByPlaceholderText(
      /Enter the business name/i
    );

    fireEvent.click(inputElementName);
    fireEvent.change(inputElementName, {
      target: { value: "Asim" },
    });
    expect(inputElementName.value).toBe("Asim");
  });
  test("should be able to type into Address Line 1  input", () => {
    render(<EditCompanyfrom />);
    const inputElementAdd1 = screen.getByPlaceholderText("Address line 1");

    fireEvent.click(inputElementAdd1);
    fireEvent.change(inputElementAdd1, {
      target: { value: "Asim" },
    });
    expect(inputElementAdd1.value).toBe("Asim");
  });
  test("should be able to type into Address Line 2  input", () => {
    render(<EditCompanyfrom />);
    const inputElementAdd2 = screen.getByPlaceholderText("Address line 2");

    fireEvent.click(inputElementAdd2);
    fireEvent.change(inputElementAdd2, {
      target: { value: "Asim" },
    });
    expect(inputElementAdd2.value).toBe("Asim");
  });

  test("should be able to type into City input", () => {
    render(<EditCompanyfrom />);
    const inputElementCity = screen.getByPlaceholderText("City");

    fireEvent.click(inputElementCity);
    fireEvent.change(inputElementCity, {
      target: { value: "Asim" },
    });
    expect(inputElementCity.value).toBe("Asim");
  });
  test("should be able to type into State input", () => {
    render(<EditCompanyfrom />);
    const inputElementState = screen.getByPlaceholderText("State");

    fireEvent.click(inputElementState);
    fireEvent.change(inputElementState, {
      target: { value: "Asim" },
    });
    expect(inputElementState.value).toBe("Asim");
  });
  test("should be able to type into Zip Code input", () => {
    render(<EditCompanyfrom />);
    const inputElementZip = screen.getByPlaceholderText("Zip code");

    fireEvent.click(inputElementZip);
    fireEvent.change(inputElementZip, {
      target: { value: "123" },
    });
    expect(inputElementZip.value).toBe("123");
  });
  test("should be able to type into phone number input", () => {
    render(<EditCompanyfrom />);
    const inputElementPhone = screen.getByPlaceholderText("Enter phone number");

    fireEvent.click(inputElementPhone);
    fireEvent.change(inputElementPhone, {
      target: { value: "11111222" },
    });
    expect(inputElementPhone.value).toBe("11111222");
  });
  test("should be able to type into email input", () => {
    render(<EditCompanyfrom />);
    const inputElementEmail = screen.getByPlaceholderText(
      "Enter email address"
    );

    fireEvent.click(inputElementEmail);
    fireEvent.change(inputElementEmail, {
      target: { value: "asimmaqsood57@gmail.com" },
    });
    expect(inputElementEmail.value).toBe("asimmaqsood57@gmail.com");
  });

  //   test("should be able to type into User input", () => {
  //     render(<EditCompanyfrom />);
  //     const inputElementUser = screen.getByPlaceholderText("User");

  //     fireEvent.click(inputElementUser);
  //     fireEvent.change(inputElementUser, {
  //       target: { value: "Asim" },
  //     });
  //     expect(inputElementUser.value).toBe("Asim");
  //   });

  //   test("should be able to type into Email input", () => {
  //     render(<EditCompanyfrom />);
  //     const inputElementEmail = screen.getByPlaceholderText("Email");

  //     fireEvent.click(inputElementEmail);
  //     fireEvent.change(inputElementEmail, {
  //       target: { value: "asimmaqsood@gmail.com" },
  //     });
  //     expect(inputElementEmail.value).toBe("asimmaqsood@gmail.com");
  //   });
  // test("should be able to type into phone input", async () => {
  //   render(<EditCompanyfrom />);
  //   const inputElementPhone = screen.getByPlaceholderText("E.g 212-456-7890");

  //   fireEvent.click(inputElementPhone);
  //   fireEvent.change(inputElementPhone, {
  //     target: { value: "123-456-7890" },
  //   });

  //   await waitFor(() => {
  //     expect(inputElementPhone.value).toBe("123-456-7890");
  //   });
  // });

  //   test("Check if the functions works", () => {
  //     render(<EditCompanyfrom />);
  //     const form = screen.getByTestId("form");
  //     const btn = screen.getByTestId("submit-button");

  //     let val = form.getAttribute("onSubmit");

  //     console.log(val);
  //     // fireEvent.click(btnFunction);

  //     fireEvent.click(btn);
  //     fireEvent.submit(form);
  //     expect(form).toBeInTheDocument();
  //     // expect(btnFunction).toBeCalled();
  //     // expect(form.getAttribute("onSubmit")).toHaveBeenCalled();
  //   });
});
