import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { selectBridge } from "../../store/bridgeSlice";
import { Bridge } from "../../types/types";
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import MainTemplate from "../../templates/MainTemplate";
import { clearToken, selectAuth } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";
import { fields } from "./formFields";
import FormGenerator from "../../components/common/FormGenerator";
import { validationSchema } from "./validationSchema";
import { fetchLoginUser } from "../../services/authService";
import { editBridge, fetchBridgeById } from "../../services/bridgeService";

const EditBridgePage = () => {
  const nic = sessionStorage.getItem("userNic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, bridge } = useSelector(selectBridge);
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchBridgeById(id));
  }, [nic, id, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const formik = useFormik({
    initialValues: {
      bridge_name: bridge?.bridge_name || "",
      road_name: bridge?.road_name || "",
      latitude: bridge?.latitude || 0,
      longitude: bridge?.longitude || 0,
      length: bridge?.length || 0,
      width: bridge?.width || 0,
      structure_condition: bridge?.structure_condition || "",
      road_surface_condition: bridge?.road_surface_condition || "",
      remarks: bridge?.remarks || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Bridge) => {
      openModal();
    },
    enableReinitialize: true,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    dispatch(editBridge(id, formik.values));
    closeModal();
    dispatch(fetchBridgeById(id));
    formik.resetForm();
    openSuccessMessage("Bridge updated successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const goBack = () => {
    navigate("/bridges");
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Bridges", "Edit Bridge"]}
      >
        <FormGenerator
          fields={fields}
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Update Bridge"}
          view={view}
        />
      </MainTemplate>
      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to update this bridge?"
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
      <CustomSnackbar
        open={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message={successMessage}
        error={error}
      />
    </>
  );
};

export default EditBridgePage;
