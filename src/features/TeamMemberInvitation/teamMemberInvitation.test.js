import "./matchMedia.mock";

import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import React from "react";
import TeamMemberInvitation from "./teamMemberInvitation";

// global.fetch = jest.fn(() => {
//   Promise.resolve({
//     json: () => Promise.resolve({}),
//   });
// });

describe("Team Member Invitation Table", () => {
  it("should fetch and render table", async () => {
    render(<TeamMemberInvitation />);
    const isDataFethced = await screen.findByText(/no data/i);

    expect(isDataFethced).toBeInTheDocument();
  });

  test("should render add user buttton", () => {
    render(<TeamMemberInvitation />);
    const isBtnRendered = screen.getByTestId("addBtn");
    expect(isBtnRendered).toBeInTheDocument();
  });
});
