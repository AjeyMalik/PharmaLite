import React, { ChangeEvent } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface TextFieldCommonProps extends Omit<TextFieldProps, "onChange"> {
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const TextFieldCommon: React.FC<TextFieldCommonProps> = ({
  label,
  value,
  error,
  helperText,
  type,
  name,
  onBlur,
  onChange,
  size,
  InputProps,
  margin,
  variant,
  fullWidth,
}) => {
  return (
    <TextField
      // id="outlined-basic"
      label={label}
      value={value}
      error={error}
      helperText={helperText}
      type={type}
      size={size}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      fullWidth={fullWidth}
      variant={variant || "outlined"}
      InputProps={InputProps}
      margin={margin}
      sx={{
        backgroundColor: "white",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border:0,
            borderBottom: "3px dotted",
           
          },
        },
       
      }}
    />
  );
};
export default TextFieldCommon;
