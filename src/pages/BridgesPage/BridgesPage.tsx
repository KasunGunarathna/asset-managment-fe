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
import { SurfaceCondition, UserType } from "../../types/enum";
import { generateCsvData } from "../../utils/generateCsv";
import { CheckPermission } from "../../utils/permissionConfig";

const filter1Name = "Structure Cond.";
const filter1Options = Object.values(SurfaceCondition);
const filter2Name = "Surface Cond.";
const filter2Options = Object.values(SurfaceCondition);

const columns = [
  { id: "bridge_name", label: "Bridge Name" },
  { id: "road_name", label: "Road Name" },
  { id: "location", label: "Latitude , longitude", location: true },
  { id: "length", label: "Road Length" },
  { id: "width", label: "Road Width" },
  { id: "structure_condition", label: "Structure Condition" },
  { id: "road_surface_condition", label: "Surface Condition" },
  { id: "remarks", label: "Remarks" },
  { id: "updatedAt", label: "Updated Date" },
];

const BridgesPage = () => {
  const nic = sessionStorage.getItem("userNic");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { bridges, loading, error } = useSelector(selectBridge);
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

  const csvData = generateCsvData(columns, bridges);

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
  console.log(logUser);
  const setSearchQuery = async (query: any) => {
    if (query) {
      await setSearchQ(query);
      const data = {
        search: query,
        f1name: "structure_condition",
        f1value: selectedFilter1Value,
        f2name: "road_surface_condition",
        f2value: selectedFilter2Value,
      };
      await dispatch(fetchSearchBridges(data));
    } else await dispatch(fetchBridges());
  };

  const handleFilter1 = async (event: any) => {
    await setFilter1Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "structure_condition",
      f1value: event.target.value,
      f2name: "road_surface_condition",
      f2value: selectedFilter2Value,
    };
    await dispatch(fetchSearchBridges(data));
  };

  const handleFilter2 = async (event: any) => {
    await setFilter2Change(event.target.value);
    const data = {
      search: searchQ,
      f1name: "structure_condition",
      f1value: selectedFilter1Value,
      f2name: "road_surface_condition",
      f2value: event.target.value,
    };
    await dispatch(fetchSearchBridges(data));
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
          csvName={`bridges_${new Date().toLocaleDateString()}.csv`}
        />
        <ReusableTable
          columns={columns}
          data={bridges}
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
