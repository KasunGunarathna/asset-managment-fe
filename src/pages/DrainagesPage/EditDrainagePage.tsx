import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { selectDrainages } from "../../store/drainageSlice";
import { Drainage } from "../../types/types";
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
  editDrainage,
  fetchDrainageById,
} from "../../services/drainageService";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";

const EditDrainagePage = () => {
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
  const { loading, error, drainage } = useSelector(selectDrainages);
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchDrainageById(id));
  }, [nic, id, dispatch]);

  const formik = useFormik({
    initialValues: {
      road_name: drainage?.road_name || "",
      drainage_type: drainage?.drainage_type || "",
      side_of_drain: drainage?.side_of_drain || "",
      starting_point_location: drainage?.starting_point_location || "",
      end_point_location: drainage?.end_point_location || "",
      condition: drainage?.condition || "",
      length: drainage?.length || 0,
      width: drainage?.width || 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values: Drainage) => {
      openModal();
    },
    enableReinitialize: true,
  });

  const handleConfirm = async () => {
    await dispatch(editDrainage(id, formik.values));
    closeModal();
    await dispatch(fetchDrainageById(id));
    formik.resetForm();
    openSuccessMessage("Drainage updated successfully!");
  };

  const goBack = () => {
    navigate("/drainages");
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        breadCrumb={[
          "Home",
          "Drainages",
          view === "true" ? "View Drainage" : "Edit Drainage",
        ]}
      >
        <FormGenerator
          fields={fields}
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={view === "true" ? "View Drainage" : "Update Drainage"}
          view={view}
        />
      </MainTemplate>
      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content={`Are you sure you want to ${
          view === "true" ? "view" : "update"
        } this drainage?`}
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

export default EditDrainagePage;
