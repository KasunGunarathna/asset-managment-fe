import { useState } from "react";

export const useFileModal = () => {
  const [fileModal, setOpenFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openFileModal = () => {
    setOpenFileModal(true);
  };

  const closeFileModal = () => {
    setOpenFileModal(false);
    setSelectedFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  return {
    fileModal,
    selectedFile,
    openFileModal,
    closeFileModal,
    handleFileChange,
  };
};
