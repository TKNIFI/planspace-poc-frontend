import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Locations from "./Locations";

describe("Location unit Test", () => {
  test("Add location button is rendering or not", () => {
    render(<Locations />);
    const divElem = screen.getByText(/add new location/i);
    expect(divElem).toBeInTheDocument();
  });
  test("Finish setup dialogue is rendering or not", () => {
    render(<Locations />);
    const divElem = screen.getByText(/finish setup/i);
    expect(divElem).toBeInTheDocument();
  });
  test("Company card is rendering or not", () => {
    render(<Locations />);
    // const divElem = screen.getByTestId("card");
    // expect(divElem).toHaveClass(
    //   "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-67k2te-MuiPaper-root-MuiCard-root"
    // );
  });
});
