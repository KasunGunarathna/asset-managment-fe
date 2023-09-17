import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, selectAuth } from "../../store/authSlice";
import ReusableTable from "../../components/common/Table";
import TableControls from "../../components/common/TableControls";
import MainTemplate from "../../templates/MainTemplate";

import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import PageLoader from "../../components/PageLoader";
import CustomDialog from "../../components/common/CustomDialog";
import CustomSnackbar from "../../components/common/Snackbar";
import { selectDrainages } from "../../store/drainageSlice"; // Import corresponding actions and selectors
import { fetchLoginUser } from "../../services/authService";
import {
  bulkUploadDrainage,
  fetchDrainages,
  fetchSearchDrainages,
  removeDrainageById,
} from "../../services/drainageService";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import { useFileModal } from "../../hooks/useFileModal";
import FileUploadModal from "../../components/common/FileUploadModal";

const DrainagesPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "road_name", label: "Road Name" },
    { id: "drainage_type", label: "Type of Drain" },
    { id: "side_of_drain", label: "Side of the Drain" },
    { id: "starting_point_latitude", label: "Starting Point Latitude" },
    { id: "starting_point_longitude", label: "Starting Point Longitude" },
    { id: "end_point_latitude", label: "End Point Latitude" },
    { id: "end_point_longitude", label: "End Point Longitude" },
    { id: "condition", label: "Condition" },
    { id: "length", label: "Length" },
    { id: "width", label: "Width" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { drainages, loading, error } = useSelector(selectDrainages); // Use the appropriate selector for drainages
  const { logUser } = useSelector(selectAuth);

  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    successMessage,
    isSuccessOpen,
    openSuccessMessage,
    closeSuccessMessage,
  } = useSuccessMessage();

  const {
    fileModal,
    openFileModal,
    closeFileModal,
    selectedFile,
    handleFileChange,
  } = useFileModal();

  const [id, setId] = useState(0);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchDrainages()); // Replace with the relevant action for fetching drainages
  }, [nic, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const addNewPage = () => {
    navigate("/drainages/add"); // Adjust the route to match your drainage form
  };

  const handleDelete = (id: any) => {
    setId(id);
    openModal();
  };
  const handleEdit = (id: any) => {
    navigate(`/drainages/edit/${id}`); // Adjust the route to match your drainage edit form
  };
  const handleView = (id: any) => {
    navigate(`/drainages/view/${id}/${true}`); // Adjust the route to match your drainage view page
  };

  const handleConfirm = async () => {
    await dispatch(removeDrainageById(id)); // Replace with the relevant action for removing drainage
    closeModal();
    await dispatch(fetchDrainages()); // Replace with the relevant action for fetching drainages
    openSuccessMessage("Drainage deleted successfully!");
  };

  const setSearchQuery = async (query: any) => {
    if (query) await dispatch(fetchSearchDrainages(query));
    // Replace with the relevant action for searching drainages
    else await dispatch(fetchDrainages()); // Replace with the relevant action for fetching drainages
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await dispatch(bulkUploadDrainage(formData));
        closeFileModal();
        openSuccessMessage("Drainages Bulk Upload successfully!");
        await dispatch(fetchDrainages());
      }
    } catch (err: any) {
      closeFileModal();
      openSuccessMessage(err.message);
    }
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Drainages"]} // Update breadcrumb
      >
        <TableControls
          setSearchQuery={setSearchQuery}
          onChange={addNewPage}
          onBulk={openFileModal}
        />
        <ReusableTable
          columns={columns}
          data={drainages}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
        />
        <CustomDialog
          open={isModalOpen}
          title="Confirmation"
          content="Are you sure you want to delete this drainage?"
          onCancel={closeModal}
          onConfirm={handleConfirm}
        />
        <CustomSnackbar
          open={isSuccessOpen}
          onClose={() => closeSuccessMessage()}
          message={successMessage}
          error={error}
        />
        <FileUploadModal
          open={fileModal}
          onClose={() => {
            closeFileModal();
          }}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          selectedFile={selectedFile}
          uploading={loading}
          error={error}
        />
      </MainTemplate>
    </>
  );
};

export default DrainagesPage;
