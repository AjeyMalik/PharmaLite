import React from "react";
import { FormControl, Typography, MenuItem, Select } from "@mui/material";

function AppSelectInput({
  name,
  value,
  label,
  onChange,
  onBlur,
  menuItems,
  className,
  disabled,
  touched,
  error,
  errorText,
  helperText,
  required,
  encrypted,
  ...rest
}: {
  name?: string;
  value: any;
  className?: string;
  label?: string;
  disabled?: boolean;
  touched?: boolean;
  error?: boolean;
  onChange: any;
  onBlur: any;
  errorText?: any;
  helperText?: any;
  menuItems: { name: string; value?: string }[];
  required?:boolean
  encrypted?:boolean
}) {
  return (
    <FormControl fullWidth margin="dense">
      <Typography variant="caption">{encrypted?'#':''}{label}{required?'*':''}</Typography>
      <Select
        variant="standard"
        size="small"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error || errorText ? true : false}
        disabled={disabled}
        label={label}
        className={className}
        {...rest}
      >
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
      {(error || errorText) && (
        <Typography variant="caption" color="error">
          {errorText || helperText}
        </Typography>
      )}
    </FormControl>
  );
}

export default AppSelectInput;
