import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import { Vehicle } from "../../types/types";
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { selectVehicle } from "../../store/vehicleSlice"; // Import vehicle-related selectors
import FormGenerator from "../../components/common/FormGenerator";
import { validationSchema } from "./validationSchema"; // Create validation schema for your vehicle
import { fields } from "./formFields"; // Define form fields for your vehicle
import { fetchLoginUser } from "../../services/authService";
import { addVehicle } from "../../services/vehicleService"; // Import vehicle-related services
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";

const AddVehiclePage = () => {
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
  const { loading, error } = useSelector(selectVehicle); // Use vehicle-related selectors
  const { logUser } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
  }, [nic, dispatch]);

  const formik = useFormik({
    initialValues: {
      vehicle_number: "",
      vehicle_make: "",
      model: "",
      fuel_type: "",
      license_from: "",
      license_to: "",
      engine_no: "",
      allocated_location: "",
      yom: "",
      yor: "",
      chassi_no: "",
      taxation_class: "",
      wheel_size: "",
      battery_required: "",
      fuel_consume: "",
      date_of_tested: "",
    },
    validationSchema: validationSchema, // Use the vehicle validation schema
    onSubmit: (values: Vehicle) => {
      openModal();
    },
  });

  const handleConfirm = async () => {
    await dispatch(addVehicle(formik.values)); 
    closeModal();
    formik.resetForm();
    openSuccessMessage("Vehicle added successfully!");
  };

  const goBack = () => {
    navigate("/vehicles"); // Adjust the navigation path as needed
  };

  const onPhotoHandle = async (name: any, selectedFile: any) => {
    await formik.setFieldValue(`${name}`, selectedFile);
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        breadCrumb={["Home", "Vehicles", "Add Vehicle"]}
      >
        <FormGenerator
          fields={fields} // Use the vehicle form fields
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Add Vehicle"}
          onPhoto={onPhotoHandle}
        />
      </MainTemplate>

      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to add this vehicle?"
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

export default AddVehiclePage;
