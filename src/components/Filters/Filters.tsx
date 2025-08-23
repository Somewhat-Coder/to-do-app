import { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarPopup from "../CalendarPopup";
import { Dayjs } from "dayjs";
import type { FC, Dispatch, SetStateAction } from "react";
import "./index.css";
import { FILTERS_LIST } from "../../utils/defs";

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
  const availableFilters = FILTERS_LIST;

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
          data-testid={filterName+"-button"}
        >
          {filterName}
        </button>
      ))}
      <button
        className={`calendar-button ${
          selectedDate != null && "selected-filter"
        }`}
        aria-label="calendar button"
        data-testid="calendar-button"
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
