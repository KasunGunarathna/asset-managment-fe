import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Typography,
} from "@mui/material";

interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  handleUpload?: any;
  handleFileChange?: any;
  selectedFile?: any;
  uploading?: any;
  error?: any;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  open,
  onClose,
  handleFileChange,
  handleUpload,
  selectedFile,
  uploading,
  error,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>Upload a File</DialogTitle>
      <DialogContent>
        <input
          type="file"
          id="file-upload-input"
          accept=".csv" // Specify the accepted file types
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="file-upload-input">
          <Button variant="outlined" component="span" sx={{ width: "100%" }}>
            Choose File
          </Button>
        </label>
        {selectedFile && (
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            Selected File: {selectedFile.name}
          </Typography>
        )}
        {error && <Typography color="red">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          color="primary"
          variant="contained"
          disabled={!selectedFile || uploading}
        >
          {uploading ? (
            <>
              <CircularProgress size={20} sx={{ marginRight: 1 }} />
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadModal;
