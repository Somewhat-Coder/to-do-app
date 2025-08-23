import { render, screen } from "../../test-utils";
import Filters from "../../components/Filters";
import dayjs from "dayjs";

describe("Filters Component", () => {
  it("renders with provided filter", () => {
    const mockSetFilter = jest.fn();
    const mockSetSelectedDate = jest.fn();

    render(
      <Filters
        filter="All"
        setFilter={mockSetFilter}
        selectedDate={null}
        setSelectedDate={mockSetSelectedDate}
      />
    );

    const filterAllButton = screen.getByTestId("All-button");
    const filterDoneButton = screen.getByTestId("Done-button");
    const filterPendingButton = screen.getByTestId("Pending-button");
    const calendarButton = screen.getByTestId("calendar-button");

    expect(filterAllButton).toHaveClass("selected-filter");
    expect(filterDoneButton).not.toHaveClass("selected-filter");
    expect(filterPendingButton).not.toHaveClass("selected-filter");
    expect(calendarButton).not.toHaveClass("selected-filter");
  });

  it("renders with provided date filter", () => {
    const mockSetFilter = jest.fn();
    const mockSetSelectedDate = jest.fn();

    render(
      <Filters
        filter="All"
        setFilter={mockSetFilter}
        selectedDate={dayjs("2025-08-20")}
        setSelectedDate={mockSetSelectedDate}
      />
    );

    const calendarButton = screen.getByTestId("calendar-button");

    expect(calendarButton).toHaveClass("selected-filter");
  });
});
