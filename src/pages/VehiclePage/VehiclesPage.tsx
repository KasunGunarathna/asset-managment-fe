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
import { selectVehicle } from "../../store/vehicleSlice";
import { fetchLoginUser } from "../../services/authService";
import {
  bulkUploadVehicle,
  fetchVehicles,
  fetchSearchVehicles,
  removeVehicleById,
} from "../../services/vehicleService"; // Import vehicle-related services
import { useFileModal } from "../../hooks/useFileModal";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import FileUploadModal from "../../components/common/FileUploadModal";
import { FuelType } from "../../types/enum"; // Import FuelType enum
import { generateCsvData } from "../../utils/generateCsv";
import { CheckPermission } from "../../utils/permissionConfig";

// Define filter options and columns for vehicles
const filter1Name = "Fuel Type";
const filter1Options = Object.values(FuelType);

const columns = [
  { id: "vehicle_number", label: "Vehicle Number" },
  { id: "vehicle_make", label: "Make" },
  { id: "model", label: "Model" },
  { id: "fuel_type", label: "Fuel Type" },
  { id: "license_from", label: "License From" },
  { id: "license_to", label: "License To" },
  { id: "engine_number", label: "Engine Number" },
  { id: "allocated_location", label: "Allocated Location" },
  { id: "yom", label: "Year of Manufacture" },
  { id: "yor", label: "Year of Registration" },
  { id: "chassi_number", label: "Chassis Number" },
  { id: "taxation_class", label: "Taxation Class" },
  { id: "wheel_size", label: "Wheel Size" },
  { id: "battery_required", label: "Battery Required" },
  { id: "fuel_consume", label: "Fuel Consumption" },
  { id: "date_of_tested", label: "Date of Test" },
  // Add more columns for additional vehicle details as needed
  { id: "updatedAt", label: "Updated Date" },
];

const VehiclesPage = () => {
  const nic = sessionStorage.getItem("userNic");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { vehicles, loading, error } = useSelector(selectVehicle); // Use vehicle-related selectors
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

  const csvData = generateCsvData(columns, vehicles);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchVehicles()); // Dispatch fetchVehicles action
  }, [nic, dispatch]);

  const addNewPage = () => {
    navigate("/vehicles/add"); // Modify the path for adding a new vehicle
  };

  const handleDelete = (id: any) => {
    setId(id);
    openModal();
  };
  const handleEdit = (id: any) => {
    navigate(`/vehicles/edit/${id}`); // Modify the path for editing a vehicle
  };
  const handleView = (id: any) => {
    navigate(`/vehicles/view/${id}/${true}`); // Modify the path for viewing a vehicle
  };

  const handleConfirm = async () => {
    await dispatch(removeVehicleById(id)); // Dispatch removeVehicleById action
    closeModal();
    await dispatch(fetchVehicles()); // Dispatch fetchVehicles action
    openSuccessMessage("Vehicle deleted successfully!");
  };
  const setSearchQuery = async (query: any) => {
    if (query) {
      await setSearchQ(query);
      // Modify data structure and fields based on your search requirements
      const data = {
        search: query,
        f1name: "fuel_type",
        f1value: selectedFilter1Value,
        f2name: "some_other_filter", // Modify with your filter name
        f2value: "",
      };
      await dispatch(fetchSearchVehicles(data)); // Dispatch fetchSearchVehicles action
    } else await dispatch(fetchVehicles()); // Dispatch fetchVehicles action
  };

  const handleFilter1 = async (event: any) => {
    await setFilter1Change(event.target.value);
    // Modify data structure and fields based on your filter requirements
    const data = {
      search: searchQ,
      f1name: "fuel_type",
      f1value: event.target.value,
      f2name: "some_other_filter", // Modify with your filter name
      f2value: "",
    };
    await dispatch(fetchSearchVehicles(data)); // Dispatch fetchSearchVehicles action
  };

  // const handleFilter2 = async (event: any) => {
  //   await setFilter2Change(event.target.value);
  //   // Modify data structure and fields based on your filter requirements
  //   const data = {
  //     search: searchQ,
  //     f1name: "fuel_type",
  //     f1value: selectedFilter1Value,
  //     f2name: "some_other_filter", // Modify with your filter name
  //     f2value: event.target.value,
  //   };
  //   await dispatch(fetchSearchVehicles(data)); // Dispatch fetchSearchVehicles action
  // };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await dispatch(bulkUploadVehicle(formData)); // Dispatch bulkUploadVehicle action
        closeFileModal();
        openSuccessMessage("Vehicles Bulk Upload successfully!");
        await dispatch(fetchVehicles()); // Dispatch fetchVehicles action
      }
    } catch (err: any) {
      closeFileModal();
      openSuccessMessage(err.message);
    }
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate userDetails={logUser} breadCrumb={["Home", "Vehicles"]}>
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
          csvData={csvData}
          csvName={`vehicles_${new Date().toLocaleDateString()}.csv`}
        />
        <ReusableTable
          columns={columns}
          data={vehicles}
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
          content="Are you sure you want to delete this vehicle?"
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

export default VehiclesPage;
