import { useState } from "react";

export const useSuccessMessage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const openSuccessMessage = (messageText: any) => {
    setSuccessMessage(messageText);
    setIsSuccessOpen(true);
  };

  const closeSuccessMessage = () => {
    setIsSuccessOpen(false);
  };

  return {
    successMessage,
    isSuccessOpen,
    openSuccessMessage,
    closeSuccessMessage,
  };
};
