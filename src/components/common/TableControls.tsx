import React from "react";
import { TextField, InputAdornment, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";

interface TableControlsProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onChange: () => void;
  onBulk?: () => void;
}

const TableControls: React.FC<TableControlsProps> = ({
  setSearchQuery,
  onChange,
  onBulk,
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
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box >
        {onBulk && (
          <Button onClick={onBulk} type="button" color="warning" variant="contained" sx={{marginRight:'10px'}}>
            <FileUploadIcon />
            Bulk Upload
          </Button>
        )}
        <Button onClick={onChange} variant="contained" type="button">
          <AddIcon />
          Add New
        </Button>
      </Box>
    </Box>
  );
};

export default TableControls;
