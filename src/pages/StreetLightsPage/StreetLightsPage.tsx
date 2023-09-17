import { useEffect, useState } from "react";
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
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { streetLights, loading, error } = useSelector(selectStreetLights);
  const { logUser } = useSelector(selectAuth);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [openFileModal, setFileOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [id, setId] = useState(0);

  const handleOpenModal = (imageURL: string) => {
    setSelectedImage(imageURL);
    setOpenImageModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setOpenImageModal(false);
  };

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchStreetLights());
  }, [nic, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    await dispatch(removeStreetLightById(id));
    closeModal();
    await dispatch(fetchStreetLights());
    openSuccessMessage("Street light deleted successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const onBulk = () => {
    setFileOpenModal(true);
  };

  const setSearchQuery = async (query: any) => {
    if (query) await dispatch(fetchSearchStreetLights(query));
    else await dispatch(fetchStreetLights());
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await dispatch(bulkUploadStreetLight(formData));
      if (!error) {
        setFileOpenModal(false);
        openSuccessMessage("Street lights Bulk Upload successfully!");
      }
      await dispatch(fetchStreetLights());
      setSelectedFile(null);
    }
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Street Lights"]}
      >
        <TableControls
          setSearchQuery={setSearchQuery}
          onChange={addNewPage}
          onBulk={onBulk}
        />
        <ReusableTable
          columns={columns}
          data={streetLights}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
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
          onClose={() => setIsSuccessOpen(false)}
          message={successMessage}
          error={error}
        />

        <ImageViewModal
          open={openImageModal}
          onClose={handleCloseModal}
          imageURL={selectedImage}
        />

        <FileUploadModal
          open={openFileModal}
          onClose={() => {
            setFileOpenModal(false);
            setSelectedFile(null);
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
