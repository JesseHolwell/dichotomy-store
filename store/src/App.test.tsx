import React from "react";
import { render, screen } from "@testing-library/react";
import App from "App";

test("renders which side are you on text", () => {
  render(<App />);
  const linkElement = screen.getByText(/which side are you on/i);
  expect(linkElement).toBeInTheDocument();
});
