import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, fetchLoginUser, selectAuth } from "../../store/authSlice";
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
  selectStreetLights,
} from "../../store/streetLightSlice"; // Import corresponding actions and selectors

const StreetLightsPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "pole_number", label: "Pole Number" },
    { id: "road_name", label: "Road Name" },
    { id: "wire_condition", label: "Wire Condition" },
    { id: "switch_condition", label: "Switch Condition" },
    { id: "pole_type", label: "Pole Type" },
    { id: "lamp_type", label: "Lamp Type" },
    { id: "photo", label: "Photo", photo:true,url:"photoUrl" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { streetLights, loading, error } = useSelector(selectStreetLights);
  const { logUser } = useSelector(selectAuth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  
  const [id, setId] = useState(0);

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

  const setSearchQuery = async (query: any) => {
    if (query) await dispatch(fetchSearchStreetLights(query));
    else await dispatch(fetchStreetLights());
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Street Lights"]}
      >
        <TableControls setSearchQuery={setSearchQuery} onChange={addNewPage} />
        <ReusableTable
          columns={columns}
          data={streetLights}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
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
      </MainTemplate>
    </>
  );
};

export default StreetLightsPage;
