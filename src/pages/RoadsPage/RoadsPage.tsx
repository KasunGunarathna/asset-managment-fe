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
import { selectRoad } from "../../store/roadSlice";
import { fetchLoginUser } from "../../services/authService";
import {
  bulkUploadRoad,
  fetchRoads,
  fetchSearchRoads,
  removeRoadById,
} from "../../services/roadService";
import FileUploadModal from "../../components/common/FileUploadModal";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import { useFileModal } from "../../hooks/useFileModal";
import ImageViewModal from "../../components/common/ImageViewModal";
import { useImageModal } from "../../hooks/useImageModal";
import { PavementType, SurfaceCondition } from "../../types/enum";
import { generateCsvData } from "../../utils/generateCsv";

const filter1Name = "Pavement Type";
const filter1Options = Object.values(PavementType);
const filter2Name = "Surface Cond.";
const filter2Options = Object.values(SurfaceCondition);

const RoadsPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "road_name", label: "Road Name" },
    { id: "length", label: "Road Length" },
    { id: "width", label: "Road Width" },
    { id: "gazetted_detail", label: "Gazetted Detail" },
    { id: "survey_plan", label: "Survey Plan" },
    { id: "surface_condition", label: "Surface Condition" },
    { id: "pavement_type", label: "Pavement Type" },
    {
      id: "starting_point_photo",
      label: "Starting Photo",
      photo: true,
      url: "startingPhotoUrl",
    },
    {
      id: "starting_point_location",
      label: "Starting Point Latitude, Longitude",
      location: true,
    },
    {
      id: "end_point_photo",
      label: "End Photo",
      photo: true,
      url: "endPhotoUrl",
    },
    {
      id: "end_point_location",
      label: "End Point Latitude, Longitude",
      location: true,
    },
    { id: "drainage_availability", label: "Drainage Availability" },
    { id: "updatedAt", label: "Updated Date" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { roads, loading, error } = useSelector(selectRoad);
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

  const csvData = generateCsvData(columns, roads);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchRoads());
  }, [nic, dispatch]);

  const addNewPage = () => {
    navigate("/roads/add");
  };

  const handleDelete = (id: any) => {
    setId(id);
    openModal();
  };
  const handleEdit = (id: any) => {
    navigate(`/roads/edit/${id}`);
  };
  const handleView = (id: any) => {
    navigate(`/roads/view/${id}/${true}`);
  };

  const handleConfirm = async () => {
    await dispatch(removeRoadById(id));
    closeModal();
    await dispatch(fetchRoads());
    openSuccessMessage("Road deleted successfully!");
  };

  const setSearchQuery = async (query: any) => {
    if (query) {
      await setSearchQ(query);
      const data = {
        search: query,
        f1name: "pavement_type",
        f1value: selectedFilter1Value,
        f2name: "surface_condition",
        f2value: selectedFilter2Value,
      };
      await dispatch(fetchSearchRoads(data));
    } else await dispatch(fetchRoads());
  };

  const handleFilter1 = async (event: any) => {
    await setFilter1Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "pavement_type",
      f1value: event.target.value,
      f2name: "surface_condition",
      f2value: selectedFilter2Value,
    };
    await dispatch(fetchSearchRoads(data));
  };

  const handleFilter2 = async (event: any) => {
    await setFilter2Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "pavement_type",
      f1value: selectedFilter1Value,
      f2name: "surface_condition",
      f2value: event.target.value,
    };
    await dispatch(fetchSearchRoads(data));
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await dispatch(bulkUploadRoad(formData));
        closeFileModal();
        openSuccessMessage("Drainages Bulk Upload successfully!");
        await dispatch(fetchRoads());
      }
    } catch (err: any) {
      closeFileModal();
      openSuccessMessage(err.message);
    }
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate userDetails={logUser} breadCrumb={["Home", "Roads"]}>
        <TableControls
          setSearchQuery={setSearchQuery}
          onChange={addNewPage}
          onBulk={openFileModal}
          filter1Name={filter1Name}
          filter1Options={filter1Options}
          filter1onChange={handleFilter1}
          selectedFilter1Value={selectedFilter1Value}
          filter2Name={filter2Name}
          filter2Options={filter2Options}
          filter2onChange={handleFilter2}
          selectedFilter2Value={selectedFilter2Value}
          csvData={csvData}
          csvName={`roads_${new Date().toLocaleDateString()}.csv`}
        />
        <ReusableTable
          columns={columns}
          data={roads}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
          handleOpenModal={handleOpenModal}
        />
        <CustomDialog
          open={isModalOpen}
          title="Confirmation"
          content="Are you sure you want to delete this road?"
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

export default RoadsPage;
