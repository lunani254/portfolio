import { render, screen } from "@testing-library/react";

// Mock @vercel/analytics since its ESM build trips Jest's default transform
jest.mock(
  "@vercel/analytics/react",
  () => ({ Analytics: () => null }),
  { virtual: true }
);

import App from "./App";

// Polyfill IntersectionObserver for the test environment
beforeAll(() => {
  class IntersectionObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  global.IntersectionObserver = IntersectionObserverMock;

  // Stub fetch so Portfolio doesn't hit GitHub during tests
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

test("renders the Victor Lunani hero heading", () => {
  render(<App />);
  const heading = screen.getByText(/Victor Lunani/i);
  expect(heading).toBeInTheDocument();
});
