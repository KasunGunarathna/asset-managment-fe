import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import { Building } from "../../types/types"; // Import the Building type
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { selectBuildings } from "../../store/buildingSlice"; // Import relevant actions and selectors
import FormGenerator from "../../components/common/FormGenerator";
import { validationSchema } from "./validationSchema";
import { fields } from "./formFields"; // Define your building form fields here
import { fetchLoginUser } from "../../services/authService";
import { addBuilding } from "../../services/buildingService"; // Import your building service function
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";

const AddBuildingPage = () => {
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
  const { loading, error } = useSelector(selectBuildings); // Use the appropriate selector for buildings
  const { logUser } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
  }, [nic, dispatch]);

  const formik = useFormik({
    initialValues: {
      // Initialize with your Building field names and default values
      name: "",
      plan: "",
      number_of_stories: 0,
      photo: "", // You can set a default URL or empty string here
      location: "",
      builtYear: 0,
      condition: "",
      remark: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Building) => {
      openModal();
    },
  });

  const handleConfirm = async () => {
    await dispatch(addBuilding(formik.values));
    closeModal();
    formik.resetForm();
    openSuccessMessage("Building added successfully!");
  };

  const goBack = () => {
    navigate("/buildings");
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        breadCrumb={["Home", "Buildings", "Add Building"]}
      >
        <FormGenerator
          fields={fields} // Use your building form fields here
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Add Building"}
        />
      </MainTemplate>

      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to add this building?"
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

export default AddBuildingPage;
