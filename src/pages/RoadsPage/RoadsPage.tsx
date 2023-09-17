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
import { selectRoad } from "../../store/roadSlice";
import { fetchLoginUser } from "../../services/authService";
import {
  fetchRoads,
  fetchSearchRoads,
  removeRoadById,
} from "../../services/roadService";

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
    { id: "starting_point_photo", label: "Starting Photo" },
    { id: "starting_point_latitude", label: "Starting Point Latitude" },
    { id: "starting_point_longitude", label: "Starting Point Longitude" },
    { id: "end_point_photo", label: "End Photo" },
    { id: "end_point_latitude", label: "End Point Latitude" },
    { id: "end_point_longitude", label: "End Point Longitude" },
    { id: "drainage_availability", label: "Drainage Availability" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { roads, loading, error } = useSelector(selectRoad);
  const { logUser } = useSelector(selectAuth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchRoads());
  }, [nic, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    await dispatch(removeRoadById(id));
    closeModal();
    await dispatch(fetchRoads());
    openSuccessMessage("Road deleted successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const setSearchQuery = async (query: any) => {
    if (query) await dispatch(fetchSearchRoads(query));
    else await dispatch(fetchRoads());
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Roads"]}
      >
        <TableControls setSearchQuery={setSearchQuery} onChange={addNewPage} />
        <ReusableTable
          columns={columns}
          data={roads}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
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
          onClose={() => setIsSuccessOpen(false)}
          message={successMessage}
          error={error}
        />
      </MainTemplate>
    </>
  );
};

export default RoadsPage;
