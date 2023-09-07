import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Button from "./Button";

interface TableControlsProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onChange: () => void;
}

const TableControls: React.FC<TableControlsProps> = ({
  setSearchQuery,
  onChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      <TextField
        label="Search"
        variant="standard"
        onChange={(e) => {setSearchQuery(e.target.value)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button onClick={onChange} type="button">
        <AddIcon />
        Add New
      </Button>
    </Box>
  );
};

export default TableControls;
