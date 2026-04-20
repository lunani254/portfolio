import '@testing-library/jest-dom';

// Mock @vercel/analytics so Jest's CJS loader does not choke on its ESM build
jest.mock(
  '@vercel/analytics/react',
  () => ({ Analytics: () => null }),
  { virtual: true }
);

// Polyfill IntersectionObserver in jsdom
if (typeof global.IntersectionObserver === 'undefined') {
  class IntersectionObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  global.IntersectionObserver = IntersectionObserverMock;
}

// Stub fetch so components that hit GitHub during render do not fail tests
if (typeof global.fetch === 'undefined') {
  global.fetch = () =>
    Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
}
