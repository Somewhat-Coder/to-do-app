import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import type { FC } from "react";
import "./index.css";
import CalendarPopup from "../CalendarPopup";
import { Dayjs } from "dayjs";

interface FilterProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  selectedDate: Dayjs | null;
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
}
const Filters: FC<FilterProps> = ({
  filter,
  setFilter,
  selectedDate,
  setSelectedDate,
}) => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const availableFilters: string[] = ["All", "Done", "Pending"];

  const handleCalendarClick = () => {
    if (selectedDate != null) {
      setSelectedDate(null);
    } else {
      setOpenCalendar(true);
    }
  };

  return (
    <div className="filters">
      {availableFilters.map((filterName: string) => (
        <button
          key={filterName}
          className={`filter-button ${
            filter === filterName && "selected-filter"
          }`}
          onClick={() => setFilter(filterName)}
          aria-label={filterName + "-filter"}
        >
          {filterName}
        </button>
      ))}
      <button
        className={`calendar-button ${
          selectedDate != null && "selected-filter"
        }`}
        aria-label="calendar-button"
        onClick={handleCalendarClick}
      >
        <CalendarTodayIcon />
      </button>
      <CalendarPopup
        openCalendar={openCalendar}
        setOpenCalendar={setOpenCalendar}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default Filters;
