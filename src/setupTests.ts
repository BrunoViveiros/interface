import "@testing-library/jest-dom";
import "jest-canvas-mock";

export const mockNavigationFunction = jest.fn();
export const mockNavigateBackFunction = jest.fn();
export const mockLogErrorFunction = jest.fn();
export const mockLogEventFunction = jest.fn();
export const mockLocationReload = jest.fn();

export function setupMocks() {
  jest.mock("hooks/useNavigation", () => ({
    __esModule: true,
    default: () => ({
      navigateTo: mockNavigationFunction,
      history: { location: {}, search: "" },
      navigateBack: mockNavigateBackFunction,
    }),
  }));
  jest.mock("services/crashReport", () => ({
    __esModule: true,
    logError: mockLogErrorFunction,
  }));
  jest.mock("services/analytics/firebase", () => ({
    __esModule: true,
    logEvent: mockLogEventFunction,
  }));
  delete (window as any).location;
  (window as any).location = { reload: mockLocationReload };
}

setupMocks();
