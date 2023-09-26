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
import {
  fetchStreetLights,
  fetchSearchStreetLights,
  removeStreetLightById,
  bulkUploadStreetLight,
} from "../../services/StreetLightService"; // Import corresponding actions and selectors
import ImageViewModal from "../../components/common/ImageViewModal";
import FileUploadModal from "../../components/common/FileUploadModal";
import { selectStreetLights } from "../../store/streetLightSlice";
import { fetchLoginUser } from "../../services/authService";
import { useModal } from "../../hooks/useModal";
import { useImageModal } from "../../hooks/useImageModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import { useFileModal } from "../../hooks/useFileModal";
import { LampType, PoleType } from "../../types/enum";
import { generateCsvData } from "../../utils/generateCsv";
import { CheckPermission } from "../../utils/permissionConfig";

const filter1Name = "Pole Type";
const filter1Options = Object.values(PoleType);
const filter2Name = "Lamp Type";
const filter2Options = Object.values(LampType);

const StreetLightsPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "pole_number", label: "Pole Number" },
    { id: "road_name", label: "Road Name" },
    { id: "wire_condition", label: "Wire Condition" },
    { id: "switch_condition", label: "Switch Condition" },
    { id: "pole_type", label: "Pole Type" },
    { id: "lamp_type", label: "Lamp Type" },
    { id: "photo", label: "Photo", photo: true, url: "photoUrl" },
    { id: "updatedAt", label: "Updated Date" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { streetLights, loading, error } = useSelector(selectStreetLights);
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

  const [selectedFilter1Value, setFilter1Change] = useState("");
  const [selectedFilter2Value, setFilter2Change] = useState("");

  const csvData = generateCsvData(columns, streetLights);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchStreetLights());
  }, [nic, dispatch]);

  const addNewPage = () => {
    navigate("/street_lights/add");
  };

  const handleDelete = (id: any) => {
    setId(id);
    openModal();
  };
  const handleEdit = (id: any) => {
    navigate(`/street_lights/edit/${id}`);
  };
  const handleView = (id: any) => {
    navigate(`/street_lights/view/${id}/${true}`);
  };

  const handleConfirm = async () => {
    await dispatch(removeStreetLightById(id));
    closeModal();
    await dispatch(fetchStreetLights());
    openSuccessMessage("Street light deleted successfully!");
  };

  const setSearchQuery = async (query: any) => {
    if (query) {
      await setSearchQ(query);
      const data = {
        search: query,
        f1name: "pole_type",
        f1value: selectedFilter1Value,
        f2name: "lamp_type",
        f2value: selectedFilter2Value,
      };
      await dispatch(fetchSearchStreetLights(data));
    } else await dispatch(fetchStreetLights());
  };

  const handleFilter1 = async (event: any) => {
    await setFilter1Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "pole_type",
      f1value: event.target.value,
      f2name: "lamp_type",
      f2value: selectedFilter2Value,
    };
    await dispatch(fetchSearchStreetLights(data));
  };

  const handleFilter2 = async (event: any) => {
    await setFilter2Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "pole_type",
      f1value: selectedFilter1Value,
      f2name: "lamp_type",
      f2value: event.target.value,
    };
    await dispatch(fetchSearchStreetLights(data));
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await dispatch(bulkUploadStreetLight(formData));
        closeFileModal();
        openSuccessMessage("Street lights Bulk Upload successfully!");
        await dispatch(fetchStreetLights());
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
        breadCrumb={["Home", "Street Lights"]}
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
          csvName={`streetLights_${new Date().toLocaleDateString()}.csv`}
        />
        <ReusableTable
          columns={columns}
          data={streetLights}
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
          handleOpenModal={handleOpenModal}
        />
        <CustomDialog
          open={isModalOpen}
          title="Confirmation"
          content="Are you sure you want to delete this street light?"
          onCancel={closeModal}
          onConfirm={handleConfirm}
        />
        <CustomSnackbar
          open={isSuccessOpen}
          onClose={() => closeSuccessMessage()}
          message={successMessage}
          error={error}
        />

        <ImageViewModal
          open={openImageModal}
          onClose={handleCloseModal}
          imageURL={selectedImage}
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

export default StreetLightsPage;
