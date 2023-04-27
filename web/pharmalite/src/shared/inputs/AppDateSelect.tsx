import React from "react";
import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function AppDatePicker({
  name,
  value,
  label,
  onChange,
  onBlur,
  className,
  disabled,
  error,
  errorText,
  helperText,
  maxDate,
  minDate,
  ...rest
}: {
  name?: string;
  value: any;
  className?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  onChange: any;
  onBlur?: any;
  errorText?: string;
  helperText?: string;
  maxDate?: any;
  minDate?: any;
}) {
  return (
    <FormControl fullWidth margin="normal">
      <DatePicker
        label={label}
        format="DD/MM/YYYY"
        value={value}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        slotProps={{
          textField: {
            name: name,
            variant: "standard",
            onBlur: onBlur,
            error: error || errorText ? true : false,
            helperText: errorText || helperText,
          },
        }}
        {...rest}
      />
    </FormControl>
  );
}

export default AppDatePicker;
