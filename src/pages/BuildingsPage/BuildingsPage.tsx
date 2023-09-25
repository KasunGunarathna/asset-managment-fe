import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";
import ReusableTable from "../../components/common/Table";
import TableControls from "../../components/common/TableControls";
import MainTemplate from "../../templates/MainTemplate";

import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import PageLoader from "../../components/PageLoader";
import CustomDialog from "../../components/common/CustomDialog";
import CustomSnackbar from "../../components/common/Snackbar";
import { selectBuildings } from "../../store/buildingSlice"; // Import corresponding actions and selectors
import { fetchLoginUser } from "../../services/authService";
import {
  bulkUploadBuilding,
  fetchBuildings,
  fetchSearchBuildings,
  removeBuildingById,
} from "../../services/buildingService"; // Import your building service functions
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import { useFileModal } from "../../hooks/useFileModal";
import FileUploadModal from "../../components/common/FileUploadModal";
import { Building } from "../../types/types"; // Import your Building type
import { CheckPermission } from "../../utils/permissionConfig";
import { generateCsvData } from "../../utils/generateCsv";

const filter1Name = "Building Type"; // Update with your filter criteria
const filter1Options = ["Residential", "Commercial", "Industrial"]; // Example filter options
const filter2Name = "Condition"; // Update with your filter criteria
const filter2Options = ["Good", "Fair", "Poor"]; // Example filter options

const BuildingsPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "name", label: "Building Name" },
    { id: "plan", label: "Plan" },
    { id: "numberOfStories", label: "Number of Stories" },
    { id: "photo", label: "Photo" },
    { id: "location", label: "Location" },
    { id: "builtYear", label: "Built Year" },
    { id: "condition", label: "Condition" },
    { id: "remark", label: "Remark" },
    { id: "updatedAt", label: "Updated Date" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { buildings, loading, error } = useSelector(selectBuildings); // Use the appropriate selector for buildings
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
  const [searchQ, setSearchQ] = useState("");

  const [selectedFilter1Value, setFilter1Change] = useState("");
  const [selectedFilter2Value, setFilter2Change] = useState("");

  // Replace this function with your own CSV generation logic
  const csvData = generateCsvData(columns, buildings);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchBuildings()); // Replace with the relevant action for fetching buildings
  }, [nic, dispatch]);

  const addNewPage = () => {
    navigate("/buildings/add"); // Adjust the route to match your building form
  };

  const handleDelete = (id: any) => {
    setId(id);
    openModal();
  };
  const handleEdit = (id: any) => {
    navigate(`/buildings/edit/${id}`); // Adjust the route to match your building edit form
  };
  const handleView = (id: any) => {
    navigate(`/buildings/view/${id}/${true}`); // Adjust the route to match your building view page
  };

  const handleConfirm = async () => {
    await dispatch(removeBuildingById(id)); // Replace with the relevant action for removing building
    closeModal();
    await dispatch(fetchBuildings()); // Replace with the relevant action for fetching buildings
    openSuccessMessage("Building deleted successfully!");
  };

  const setSearchQuery = async (query: any) => {
    if (query) {
      await setSearchQ(query);
      const data = {
        search: query,
        f1name: "plan", // Replace with your filter criteria
        f1value: selectedFilter1Value,
        f2name: "condition", // Replace with your filter criteria
        f2value: selectedFilter2Value,
      };
      await dispatch(fetchSearchBuildings(data)); // Replace with the relevant action for searching buildings
    } else await dispatch(fetchBuildings()); // Replace with the relevant action for fetching buildings
  };

  const handleFilter1 = async (event: any) => {
    await setFilter1Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "plan", // Replace with your filter criteria
      f1value: event.target.value,
      f2name: "condition", // Replace with your filter criteria
      f2value: selectedFilter2Value,
    };
    await dispatch(fetchSearchBuildings(data)); // Replace with the relevant action for searching buildings
  };

  const handleFilter2 = async (event: any) => {
    await setFilter2Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "plan", // Replace with your filter criteria
      f1value: selectedFilter1Value,
      f2name: "condition", // Replace with your filter criteria
      f2value: event.target.value,
    };
    await dispatch(fetchSearchBuildings(data)); // Replace with the relevant action for searching buildings
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await dispatch(bulkUploadBuilding(formData)); // Replace with the relevant action for bulk uploading buildings
        closeFileModal();
        openSuccessMessage("Buildings Bulk Upload successfully!");
        await dispatch(fetchBuildings()); // Replace with the relevant action for fetching buildings
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
        breadCrumb={["Home", "Buildings"]} // Update breadcrumb
      >
        <TableControls
          setSearchQuery={setSearchQuery}
          onAdd={
            CheckPermission(logUser?.user_type, "add") ? addNewPage : undefined
          }
          onBulk={
            CheckPermission(logUser?.user_type, "bulk")
              ? openFileModal
              : undefined
          }
          filter2Name={filter2Name}
          filter2Options={filter2Options}
          filter2onChange={handleFilter2}
          selectedFilter2Value={selectedFilter2Value}
          csvData={csvData}
          csvName={`buildings_${new Date().toLocaleDateString()}.csv`}
        />
        <ReusableTable
          columns={columns}
          data={buildings}
          handleDelete={
            CheckPermission(logUser?.user_type, "delete")
              ? handleDelete
              : undefined
          }
          handleEdit={
            CheckPermission(logUser?.user_type, "edit") ? handleEdit : undefined
          }
          handleView={
            CheckPermission(logUser?.user_type, "view") ? handleView : undefined
          }
        />
        <CustomDialog
          open={isModalOpen}
          title="Confirmation"
          content="Are you sure you want to delete this building?"
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

export default BuildingsPage;
