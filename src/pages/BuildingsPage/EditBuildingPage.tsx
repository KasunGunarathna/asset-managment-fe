import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { selectBuildings } from "../../store/buildingSlice"; // Import building-related actions and selectors
import { Building } from "../../types/types"; // Import the Building type
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import MainTemplate from "../../templates/MainTemplate";
import { selectAuth } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";
import { validationSchema } from "./validationSchema";
import FormGenerator from "../../components/common/FormGenerator";
import { fields } from "./formFields";
import { fetchLoginUser } from "../../services/authService";
import {
  editBuilding,
  fetchBuildingById,
} from "../../services/buildingService"; // Import your building service functions
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";

const EditBuildingPage = () => {
  const nic = sessionStorage.getItem("userNic");
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    successMessage,
    isSuccessOpen,
    openSuccessMessage,
    closeSuccessMessage,
  } = useSuccessMessage();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, building } = useSelector(selectBuildings); // Use the appropriate selector for buildings
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchBuildingById(id)); // Fetch building data by ID
  }, [nic, id, dispatch]);

  const formik = useFormik({
    initialValues: {
      // Initialize with your Building field names and default values
      name: building?.name || "",
      plan: building?.plan || "",
      numberOfStories: building?.numberOfStories || 0,
      photo: building?.photo || "",
      location: building?.location || "",
      builtYear: building?.builtYear || 0,
      condition: building?.condition || "",
      remark: building?.remark || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Building) => {
      openModal();
    },
    enableReinitialize: true,
  });

  const handleConfirm = async () => {
    await dispatch(editBuilding(id, formik.values));
    closeModal();
    await dispatch(fetchBuildingById(id));
    formik.resetForm();
    openSuccessMessage("Building updated successfully!");
  };

  const goBack = () => {
    navigate("/buildings");
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        breadCrumb={[
          "Home",
          "Buildings",
          view === "true" ? "View Building" : "Edit Building",
        ]}
      >
        <FormGenerator
          fields={fields} // Use your building form fields here
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={view === "true" ? "View Building" : "Update Building"}
          view={view}
        />
      </MainTemplate>
      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content={`Are you sure you want to ${
          view === "true" ? "view" : "update"
        } this building?`}
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
      <CustomSnackbar
        open={isSuccessOpen}
        onClose={() => closeSuccessMessage()}
        message={successMessage}
        error={error}
      />
    </>
  );
};

export default EditBuildingPage;
