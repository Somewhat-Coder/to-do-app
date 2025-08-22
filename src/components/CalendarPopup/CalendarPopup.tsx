import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dialog, DialogContent } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import type { FC, Dispatch, SetStateAction } from "react";
import "./index.css";

interface CalendarPopupProps {
  openCalendar: boolean;
  setOpenCalendar: Dispatch<SetStateAction<boolean>>;
  selectedDate: Dayjs | null;
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
}

const CalendarPopup: FC<CalendarPopupProps> = ({
  openCalendar,
  setOpenCalendar,
  selectedDate,
  setSelectedDate,
}) => {
  const handleDateChange = (selectedDate: Dayjs | null) => {
    setSelectedDate(selectedDate);
    setOpenCalendar(false);
  };

  return (
    <Dialog
      className="calendar-dialog"
      open={openCalendar}
      onClose={() => setOpenCalendar(false)}
    >
      <DialogContent style={{ padding: "20px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="custom-calendar"
            sx={{
              width: "100%",
            }}
            views={["day"]}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarPopup;
