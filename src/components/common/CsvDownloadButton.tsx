import React from "react";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface CsvDownloadButtonProps {
  csvData: string;
  fileName: string;
  buttonText?: string;
}

const CsvDownloadButton: React.FC<CsvDownloadButtonProps> = ({
  csvData,
  fileName,
  buttonText = "Download CSV",
}) => {
  const handleDownload = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";

    // Use the defaultFileName or a custom filename if provided
    a.href = url;
    a.setAttribute("download", fileName); // Set the 'download' attribute

    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleDownload}
      sx={{ marginRight: "10px" }}
    >
      <FileDownloadIcon />
      {buttonText}
    </Button>
  );
};

export default CsvDownloadButton;
