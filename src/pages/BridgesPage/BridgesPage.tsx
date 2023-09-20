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
import { selectBridge } from "../../store/bridgeSlice";
import { fetchLoginUser } from "../../services/authService";
import {
  bulkUploadBridge,
  fetchBridges,
  fetchSearchBridges,
  removeBridgeById,
} from "../../services/bridgeService";
import { useFileModal } from "../../hooks/useFileModal";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import FileUploadModal from "../../components/common/FileUploadModal";

const BridgesPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "bridge_name", label: "Bridge Name" },
    { id: "road_name", label: "Road Name" },
    { id: "location", label: "Latitude , longitude" },
    { id: "length", label: "Road Length" },
    { id: "width", label: "Road Width" },
    { id: "structure_condition", label: "Structure Condition" },
    { id: "road_surface_condition", label: "Surface Condition" },
    { id: "remarks", label: "Remarks" },
    { id: "updatedAt", label: "Updated Date" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { bridges, loading, error } = useSelector(selectBridge, undefined);
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
    dispatch(fetchBridges());
  }, [nic, dispatch]);

  const addNewPage = () => {
    navigate("/bridges/add");
  };

  const handleDelete = (id: any) => {
    setId(id);
    openModal();
  };
  const handleEdit = (id: any) => {
    navigate(`/bridges/edit/${id}`);
  };
  const handleView = (id: any) => {
    navigate(`/bridges/view/${id}/${true}`);
  };

  const handleConfirm = async () => {
    await dispatch(removeBridgeById(id));
    closeModal();
    await dispatch(fetchBridges());
    openSuccessMessage("Bridge deleted successfully!");
  };

  const setSearchQuery = async (query: any) => {
    if (query) await dispatch(fetchSearchBridges(query));
    else await dispatch(fetchBridges());
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await dispatch(bulkUploadBridge(formData));
        closeFileModal();
        openSuccessMessage("Bridges Bulk Upload successfully!");
        await dispatch(fetchBridges());
      }
    } catch (err: any) {
      closeFileModal();
      openSuccessMessage(err.message);
    }
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate userDetails={logUser} breadCrumb={["Home", "Bridges"]}>
        <TableControls
          setSearchQuery={setSearchQuery}
          onChange={addNewPage}
          onBulk={openFileModal}
        />
        <ReusableTable
          columns={columns}
          data={bridges}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
        />
        <CustomDialog
          open={isModalOpen}
          title="Confirmation"
          content="Are you sure you want to delete this bridge?"
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

export default BridgesPage;
