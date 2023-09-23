import React from "react";
import {
  TextField,
  InputAdornment,
  Box,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CsvDownloadButton from "./CsvDownloadButton";

interface TableControlsProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onChange: () => void;
  onBulk?: () => void;
  filter1Name?: any;
  filter1Options?: any;
  filter1onChange?: (event: any) => void;
  selectedFilter1Value?: any;
  filter2Name?: any;
  filter2Options?: any;
  filter2onChange?: (event: any) => void;
  selectedFilter2Value?: any;
  csvData?: any;
  csvName?: any;
}

const TableControls: React.FC<TableControlsProps> = ({
  setSearchQuery,
  onChange,
  onBulk,
  filter1Name,
  filter1Options,
  filter1onChange,
  selectedFilter1Value,
  filter2Name,
  filter2Options,
  filter2onChange,
  selectedFilter2Value,
  csvData,
  csvName,
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
      <Box>
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
        {filter1Name && (
          <FormControl
            variant="standard"
            sx={{ width: "150px", marginLeft: "20px" }}
          >
            <InputLabel>{filter1Name}</InputLabel>
            <Select
              name={filter1Name}
              value={selectedFilter1Value}
              onChange={filter1onChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {filter1Options.map((filter2Option: any) => (
                <MenuItem key={filter2Option} value={filter2Option}>
                  {filter2Option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {filter2Name && (
          <FormControl
            variant="standard"
            sx={{ width: "150px", marginLeft: "20px" }}
          >
            <InputLabel>{filter2Name}</InputLabel>
            <Select
              name={filter2Name}
              value={selectedFilter2Value}
              onChange={filter2onChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {filter2Options.map((filter2Option: any) => (
                <MenuItem key={filter2Option} value={filter2Option}>
                  {filter2Option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      <Box>
        {csvName && (
          <CsvDownloadButton
            csvData={csvData}
            fileName={csvName}
            buttonText="Download CSV"
          />
        )}
        {onBulk && (
          <Button
            onClick={onBulk}
            type="button"
            color="warning"
            variant="contained"
            sx={{ marginRight: "10px" }}
          >
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
