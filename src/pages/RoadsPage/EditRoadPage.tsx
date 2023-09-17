import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { selectRoad } from "../../store/roadSlice"; // Import road-related actions and selectors
import { Road } from "../../types/types"; // Import the Road type
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import MainTemplate from "../../templates/MainTemplate";
import { clearToken, selectAuth } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";
import { validationSchema } from "./validationSchema";
import FormGenerator from "../../components/common/FormGenerator";
import { fields } from "./formFields";
import { fetchLoginUser } from "../../services/authService";
import { editRoad, fetchRoadById } from "../../services/roadService";

const EditRoadPage = () => {
  const nic = sessionStorage.getItem("userNic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, road } = useSelector(selectRoad);
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchRoadById(id)); // Fetch road data by ID
  }, [nic, id, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const formik = useFormik({
    initialValues: {
      road_name: road?.road_name || "",
      length: road?.length || 0,
      width: road?.width || 0,
      gazetted_detail: road?.gazetted_detail || "",
      survey_plan: road?.survey_plan || "",
      surface_condition: road?.surface_condition || "",
      pavement_type: road?.pavement_type || "",
      starting_point_latitude: road?.starting_point_latitude || 0,
      starting_point_longitude: road?.starting_point_longitude || 0,
      starting_point_photo: road?.starting_point_photo || "",
      end_point_latitude: road?.end_point_latitude || 0,
      end_point_longitude: road?.end_point_longitude || 0,
      end_point_photo: road?.end_point_photo || "",
      drainage_availability: road?.drainage_availability || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Road) => {
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
    dispatch(editRoad(id, formik.values));
    closeModal();
    dispatch(fetchRoadById(id));
    formik.resetForm();
    openSuccessMessage("Road updated successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const goBack = () => {
    navigate("/roads");
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Roads", "Edit Road"]}
      >
        <FormGenerator
          fields={fields}
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Update Road"}
          view={view}
        />
      </MainTemplate>
      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to update this road?"
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

export default EditRoadPage;
