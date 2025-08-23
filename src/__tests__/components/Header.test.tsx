import { render, screen } from "../../test-utils";
import Header from "../../components/Header";
import dayjs from "dayjs";

describe("Header Component", () => {
  it("renders correctly", () => {
    render(<Header numberOfTasks={5} selectedDate={dayjs("2025-08-20")}/>);
    expect(screen.getByTestId("tasks-count")).toHaveTextContent("5 Tasks");
    expect(screen.getByTestId("day-date-text")).toHaveTextContent("Wednesday, 20th");
    expect(screen.getByTestId("month-text")).toHaveTextContent("August");
  });

    it("renders correctly", () => {
    render(<Header numberOfTasks={2} selectedDate={dayjs("2025-07-01")}/>);
    expect(screen.getByTestId("tasks-count")).toHaveTextContent("2 Tasks");
    expect(screen.getByTestId("day-date-text")).toHaveTextContent("Tuesday, 1st");
    expect(screen.getByTestId("month-text")).toHaveTextContent("July");
  });
});
