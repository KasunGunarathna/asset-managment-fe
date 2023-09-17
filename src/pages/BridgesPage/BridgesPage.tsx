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
import { selectBridge } from "../../store/bridgeSlice";
import { fetchLoginUser } from "../../services/authService";
import {
  fetchBridges,
  fetchSearchBridges,
  removeBridgeById,
} from "../../services/bridgeService";

const BridgesPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "bridge_name", label: "Bridge Name" },
    { id: "road_name", label: "Road Name" },
    { id: "latitude", label: "Latitude" },
    { id: "longitude", label: "longitude" },
    { id: "length", label: "Road Length" },
    { id: "width", label: "Road Width" },
    { id: "structure_condition", label: "Structure Condition" },
    { id: "road_surface_condition", label: "Surface Condition" },
    { id: "remarks", label: "Remarks" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { bridges, loading, error } = useSelector(selectBridge);
  const { logUser } = useSelector(selectAuth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchBridges());
  }, [nic, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    await dispatch(removeBridgeById(id));
    closeModal();
    await dispatch(fetchBridges());
    openSuccessMessage("Bridge deleted successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const setSearchQuery = async (query: any) => {
    if (query) await dispatch(fetchSearchBridges(query));
    else await dispatch(fetchBridges());
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Bridges"]}
      >
        <TableControls setSearchQuery={setSearchQuery} onChange={addNewPage} />
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
          onClose={() => setIsSuccessOpen(false)}
          message={successMessage}
          error={error}
        />
      </MainTemplate>
    </>
  );
};

export default BridgesPage;
