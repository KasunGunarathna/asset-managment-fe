import { useState } from "react";

export const useImageModal = () => {
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpenModal = (imageURL: string) => {
    setSelectedImage(imageURL);
    setOpenImageModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setOpenImageModal(false);
  };

  const openModal = () => {
    setSelectedImage(null);
    setOpenImageModal(true);
  };

  return {
    openImageModal,
    selectedImage,
    handleOpenModal,
    handleCloseModal,
    openModal,
  };
};
