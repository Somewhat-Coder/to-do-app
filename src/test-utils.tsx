import React from "react";
import { render as rtlRender } from "@testing-library/react";
import '@testing-library/jest-dom';
import type { RenderOptions } from "@testing-library/react";
import { TasksProvider } from "./context/TasksContext";

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  rtlRender(<TasksProvider>{ui}</TasksProvider>, options);

// Re-export everything **except render**
export * from "@testing-library/react";

// Override render with your custom one
export { customRender as render };
