import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerComponent({ selectedDate, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        selected={selectedDate} // Pass the selected date as "selected"
        onChange={onChange} // Pass the onChange function to handle the selected date
        dateFormat="dd/MM/yyyy"
      />
    </LocalizationProvider>
  );
}
