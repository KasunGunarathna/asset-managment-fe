import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import { StreetLight } from "../../types/types"; // Import the StreetLight type
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { selectStreetLights } from "../../store/streetLightSlice"; // Import relevant actions and selectors
import FormGenerator from "../../components/common/FormGenerator";
import { validationSchema } from "./validationSchema";
import { fields } from "./formFields"; // Define your street lights form fields here
import {
  addStreetLight,
  imageUploadStreetLight,
} from "../../services/StreetLightService";
import { fetchLoginUser } from "../../services/authService";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import { useModal } from "../../hooks/useModal";

const AddStreetLightPage = () => {
  const nic = sessionStorage.getItem("userNic");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectStreetLights);
  const { logUser } = useSelector(selectAuth);

  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    successMessage,
    isSuccessOpen,
    openSuccessMessage,
    closeSuccessMessage,
  } = useSuccessMessage();

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
  }, [nic, dispatch]);

  const formik = useFormik({
    initialValues: {
      // Initialize with your StreetLight field names and default values
      pole_number: "",
      road_name: "",
      wire_condition: "",
      switch_condition: "",
      pole_type: "",
      lamp_type: "",
      photo: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values: StreetLight) => {
      openModal();
    },
  });

  const handleConfirm = async () => {
    const photo: any = formik.values.photo;
    let data: StreetLight = formik.values;
    delete data.photo;
    const res = await dispatch(addStreetLight(data));
    const formData = new FormData();
    if (photo !== undefined) {
      formData.append("file", photo);
      await dispatch(imageUploadStreetLight(res.id, formData));
    }
    closeModal();
    formik.resetForm();
    await formik.setFieldValue(`photo`, null);
    openSuccessMessage("Street light added successfully!");
  };

  const goBack = () => {
    navigate("/street_lights");
  };

  const onPhotoHandle = async (name: any, selectedFile: any) => {
    await formik.setFieldValue(`${name}`, selectedFile);
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        breadCrumb={["Home", "Street Lights", "Add Street Light"]}
      >
        <FormGenerator
          fields={fields} // Use your street light form fields here
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Add Street Light"}
          onPhoto={onPhotoHandle}
        />
      </MainTemplate>

      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to add this street light?"
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

export default AddStreetLightPage;
