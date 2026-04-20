import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the Victor Lunani hero heading", () => {
  render(<App />);
  const heading = screen.getByText(/Victor Lunani/i);
  expect(heading).toBeInTheDocument();
});
