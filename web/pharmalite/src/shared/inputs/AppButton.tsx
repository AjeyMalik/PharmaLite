import { Button } from "@mui/material";
import React from "react";

function AppButton({
  btnText,
  variant,
  color,
  type,
  onClick,
  className,
  startIcon,
  ...rest
}: {
  btnText: string;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  type: any;
  onClick: any;
  className?: string;
  startIcon?: any;
}) {
  return (
    <Button
      startIcon={startIcon || ""}
      type={type}
      onClick={onClick}
      fullWidth
      variant={variant || "contained"}
      color={color || "primary"}
      className={className}
      {...rest}
    >
      {btnText}
    </Button>
  );
}

export default AppButton;
