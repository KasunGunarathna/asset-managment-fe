import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import { Drainage } from "../../types/types"; // Import the Drainage type
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { selectDrainages } from "../../store/drainageSlice"; // Import relevant actions and selectors
import FormGenerator from "../../components/common/FormGenerator";
import { validationSchema } from "./validationSchema";
import { fields } from "./formFields"; // Define your drainage form fields here
import { fetchLoginUser } from "../../services/authService";
import { addDrainage } from "../../services/drainageService";

const AddDrainagePage = () => {
  const nic = sessionStorage.getItem("userNic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectDrainages); // Use the appropriate selector for drainages
  const { logUser } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
  }, [nic, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const formik = useFormik({
    initialValues: {
      // Initialize with your Drainage field names and default values
      road_name: "",
      drainage_type: "",
      side_of_drain: "",
      starting_point_latitude: 0,
      starting_point_longitude: 0,
      end_point_latitude: 0,
      end_point_longitude: 0,
      condition: "",
      length: 0,
      width: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values: Drainage) => {
      openModal();
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    await dispatch(addDrainage(formik.values));
    closeModal();
    formik.resetForm();
    openSuccessMessage("Drainage added successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const goBack = () => {
    navigate("/drainages");
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Drainages", "Add Drainage"]}
      >
        <FormGenerator
          fields={fields} // Use your drainage form fields here
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Add Drainage"}
        />
      </MainTemplate>

      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to add this drainage?"
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

export default AddDrainagePage;
