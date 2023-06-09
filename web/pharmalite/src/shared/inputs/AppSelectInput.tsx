import React from "react";
import {
  FormControl,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

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
  menuItems: { label: string; value?: string }[];
  required?: boolean;
  encrypted?: boolean;
}) {
  return (
    <FormControl fullWidth margin="dense">
      <Typography variant="caption">
        {encrypted ? "#" : ""}
        {label}
        {required ? "*" : ""}
      </Typography>
      {/* <Select
        variant="standard"
        size="small"
        name={name}
        defaultValue={''}
        value={value ?? ''}
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
      </Select> */}
      <Autocomplete
        value={value ? menuItems.find((e) =>e.value === value) : ""}
        className={className}
        options={menuItems}
        getOptionLabel={(option) =>
          typeof option !== "string" ? option.label : option
        }
        onChange={(e, value) => {
          onChange(value);
        }}
        onBlur={onBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            size="small"
            name={name}
            error={error || errorText ? true : false}
            helperText={errorText || helperText}
          />
        )}
      />
      {/* {(error || errorText) && (
        <Typography variant="caption" color="error">
          {errorText || helperText}
        </Typography>
      )} */}
    </FormControl>
  );
}

export default AppSelectInput;
