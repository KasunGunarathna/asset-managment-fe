import { useEffect, useState } from "react";
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
import { selectBuildings } from "../../store/buildingSlice";
import { fetchLoginUser } from "../../services/authService";
import {
  bulkUploadBuilding,
  fetchBuildings,
  fetchSearchBuildings,
  removeBuildingById,
} from "../../services/buildingService";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import { useFileModal } from "../../hooks/useFileModal";
import FileUploadModal from "../../components/common/FileUploadModal";
import { CheckPermission } from "../../utils/permissionConfig";
import { generateCsvData } from "../../utils/generateCsv";
import ImageViewModal from "../../components/common/ImageViewModal";
import { useImageModal } from "../../hooks/useImageModal";
import { SurfaceCondition } from "../../types/enum";

const filter2Name = "Condition";
const filter2Options = Object.values(SurfaceCondition);

const BuildingsPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "name", label: "Building Name" },
    { id: "plan", label: "Plan" },
    { id: "number_of_stories", label: "Number of Stories" },
    { id: "photo", label: "Photo", photo: true, url: "photoUrl" },
    { id: "location", label: "Location" },
    { id: "built_year", label: "Built Year" },
    { id: "condition", label: "Condition" },
    { id: "remark", label: "Remark" },
    { id: "updatedAt", label: "Updated Date" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { buildings, loading, error } = useSelector(selectBuildings);
  const { logUser } = useSelector(selectAuth);

  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    successMessage,
    isSuccessOpen,
    openSuccessMessage,
    closeSuccessMessage,
  } = useSuccessMessage();
  const { openImageModal, selectedImage, handleOpenModal, handleCloseModal } =
    useImageModal();
  const {
    fileModal,
    openFileModal,
    closeFileModal,
    selectedFile,
    handleFileChange,
  } = useFileModal();

  const [id, setId] = useState(0);
  const [searchQ, setSearchQ] = useState("");

 
  const [selectedFilter2Value, setFilter2Change] = useState("");

  const csvData = generateCsvData(columns, buildings);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchBuildings());
  }, [nic, dispatch]);

  const addNewPage = () => {
    navigate("/buildings/add");
  };

  const handleDelete = (id: any) => {
    setId(id);
    openModal();
  };
  const handleEdit = (id: any) => {
    navigate(`/buildings/edit/${id}`);
  };
  const handleView = (id: any) => {
    navigate(`/buildings/view/${id}/${true}`);
  };

  const handleConfirm = async () => {
    await dispatch(removeBuildingById(id));
    closeModal();
    await dispatch(fetchBuildings());
    openSuccessMessage("Building deleted successfully!");
  };

  const setSearchQuery = async (query: any) => {
    if (query) {
      await setSearchQ(query);
      const data = {
        search: query,
        f1name: "plan",
        f1value: "",
        f2name: "condition",
        f2value: selectedFilter2Value,
      };
      await dispatch(fetchSearchBuildings(data));
    } else await dispatch(fetchBuildings());
  };

  const handleFilter2 = async (event: any) => {
    await setFilter2Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "plan",
      f1value: "",
      f2name: "condition",
      f2value: event.target.value,
    };
    await dispatch(fetchSearchBuildings(data));
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await dispatch(bulkUploadBuilding(formData));
        closeFileModal();
        openSuccessMessage("Buildings Bulk Upload successfully!");
        await dispatch(fetchBuildings());
      }
    } catch (err: any) {
      closeFileModal();
      openSuccessMessage(err.message);
    }
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate userDetails={logUser} breadCrumb={["Home", "Buildings"]}>
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
          handleOpenModal={handleOpenModal}
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
        <ImageViewModal
          open={openImageModal}
          onClose={handleCloseModal}
          imageURL={selectedImage}
        />
      </MainTemplate>
    </>
  );
};

export default BuildingsPage;
