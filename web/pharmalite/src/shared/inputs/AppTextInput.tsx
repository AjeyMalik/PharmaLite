import React from "react";
import { FormControl, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorIcon from "@mui/icons-material/Error";

function AppTextInput({
  type,
  name,
  onChange,
  onBlur,
  value,
  rows,
  placeholder,
  className,
  label,
  error,
  icon,
  multiline,
  errorText,
  helperText,
  endIcon,
  mBottom,
  disabled,
  required,
  ...rest
}: {
  type?: string;
  name?: string;
  onChange: any;
  onBlur: any;
  value: any;
  rows?: any;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: boolean;
  icon?: any;
  multiline?: boolean;
  errorText?: any;
  helperText?: any;
  endIcon?: any;
  mBottom?: any;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <FormControl fullWidth margin="normal">
      {label && <Typography variant="caption">{label}{required?'*':''}</Typography>}
      <TextField
        variant="standard"
        size="small"
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        error={error || errorText ? true : false}
        helperText={errorText || helperText}
        value={value}
        disabled={disabled}
        multiline={multiline || rows ? true : false}
        rows={rows || 1}
        sx={{
          bgcolor: "background.grid",
          color: "background.grid",
          marginBottom: mBottom,
          "&.selectedText": {
            bgcolor: "background.grid",
          },
        }}
        {...rest}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" sx={{ color: "#e60000" }}>
              {errorText ? <ErrorIcon /> : " "}
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}

export default AppTextInput;
