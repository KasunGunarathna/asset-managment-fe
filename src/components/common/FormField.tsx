import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  select?: boolean;
  options?: string[];
  value: any;
  onChange: any;
  onBlur: any;
  error: boolean;
  helperText: string;
  view: any;
  password?: any;
  setShowPassword?: any;
  showPassword?: any;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  select = false,
  options = [],
  value,
  onChange,
  onBlur,
  error,
  helperText,
  view,
  password,
  showPassword,
  setShowPassword,
}) => {
  return (
    <FormControl fullWidth>
      {select ? (
        <>
          <InputLabel>{label}</InputLabel>
          <Select
            disabled={view ? true : false}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </>
      ) : (
        <TextField
          disabled={view ? true : false}
          name={name}
          label={label}
          fullWidth
          type={(showPassword && password) ? "password" : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          InputProps={
            password
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : undefined
          }
        />
      )}
    </FormControl>
  );
};

export default FormField;
