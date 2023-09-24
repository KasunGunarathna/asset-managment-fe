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
import { DrainageType, SurfaceCondition } from "../../types/enum";
import { generateCsvData } from "../../utils/generateCsv";
import { CheckPermission } from "../../utils/permissionConfig";

const filter1Name = "Type of Drain";
const filter1Options = Object.values(DrainageType);
const filter2Name = "Condition";
const filter2Options = Object.values(SurfaceCondition);

const DrainagesPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "road_name", label: "Road Name" },
    { id: "drainage_type", label: "Type of Drain" },
    { id: "side_of_drain", label: "Side of the Drain" },
    {
      id: "starting_point_location",
      label: "Starting Point Latitude, Longitude",
      location: true,
    },
    {
      id: "end_point_location",
      label: "End Point Latitude, Longitude",
      location: true,
    },
    { id: "condition", label: "Condition" },
    { id: "length", label: "Length" },
    { id: "width", label: "Width" },
    { id: "updatedAt", label: "Updated Date" },
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
  const [searchQ, setSearchQ] = useState("");

  const [selectedFilter1Value, setFilter1Change] = useState("");
  const [selectedFilter2Value, setFilter2Change] = useState("");

  const csvData = generateCsvData(columns, drainages);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchDrainages()); // Replace with the relevant action for fetching drainages
  }, [nic, dispatch]);

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
    if (query) {
      await setSearchQ(query);
      const data = {
        search: query,
        f1name: "drainage_type",
        f1value: selectedFilter1Value,
        f2name: "condition",
        f2value: selectedFilter2Value,
      };
      await dispatch(fetchSearchDrainages(data));
    } else await dispatch(fetchDrainages());
  };

  const handleFilter1 = async (event: any) => {
    await setFilter1Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "drainage_type",
      f1value: event.target.value,
      f2name: "condition",
      f2value: selectedFilter2Value,
    };
    await dispatch(fetchSearchDrainages(data));
  };

  const handleFilter2 = async (event: any) => {
    await setFilter2Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "drainage_type",
      f1value: selectedFilter1Value,
      f2name: "condition",
      f2value: event.target.value,
    };
    await dispatch(fetchSearchDrainages(data));
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
        breadCrumb={["Home", "Drainages"]} // Update breadcrumb
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
          filter1Name={filter1Name}
          filter1Options={filter1Options}
          filter1onChange={handleFilter1}
          selectedFilter1Value={selectedFilter1Value}
          filter2Name={filter2Name}
          filter2Options={filter2Options}
          filter2onChange={handleFilter2}
          selectedFilter2Value={selectedFilter2Value}
          csvData={csvData}
          csvName={`drainages_${new Date().toLocaleDateString()}.csv`}
        />
        <ReusableTable
          columns={columns}
          data={drainages}
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
