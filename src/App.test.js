import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the Victor Lunani hero heading", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { name: /Victor Lunani/i, level: 1 });
  expect(heading).toBeInTheDocument();
});
