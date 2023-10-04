import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { selectVehicle } from "../../store/vehicleSlice";
import { Vehicle } from "../../types/types";
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import MainTemplate from "../../templates/MainTemplate";
import { selectAuth } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";
import { fields } from "./formFields"; // Define vehicle form fields
import FormGenerator from "../../components/common/FormGenerator";
import { validationSchema } from "./validationSchema"; // Create validation schema for vehicles
import { fetchLoginUser } from "../../services/authService";
import { editVehicle, fetchVehicleById } from "../../services/vehicleService"; // Import vehicle-related services
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";

const EditVehiclePage = () => {
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
  const { loading, error, vehicle } = useSelector(selectVehicle); // Use vehicle-related selectors
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchVehicleById(id)); // Dispatch fetchVehicleById action
  }, [nic, id, dispatch]);

  const formik = useFormik({
    initialValues: {
      vehicle_number: vehicle?.vehicle_number || "",
      vehicle_make: vehicle?.vehicle_make || "",
      model: vehicle?.model || "",
      fuel_type: vehicle?.fuel_type || "",
      license_from: vehicle?.license_from || "",
      license_to: vehicle?.license_to || "",
      engine_no: vehicle?.engine_no || "",
      allocated_location: vehicle?.allocated_location || "",
      yom: vehicle?.yom || "",
      yor: vehicle?.yor || "",
      chassi_no: vehicle?.chassi_no || "",
      taxation_class: vehicle?.taxation_class || "",
      wheel_size: vehicle?.wheel_size || "",
      battery_required: vehicle?.battery_required || "",
      fuel_consume: vehicle?.fuel_consume || "",
      date_of_tested: vehicle?.date_of_tested || "",
    },
    validationSchema: validationSchema, // Use the vehicle validation schema
    onSubmit: (values: Vehicle) => {
      openModal();
    },
    enableReinitialize: true,
  });

  const handleConfirm = async () => {
    await dispatch(editVehicle(id, formik.values)); // Dispatch the editVehicle action
    closeModal();
    await dispatch(fetchVehicleById(id)); // Dispatch the fetchVehicleById action
    formik.resetForm();
    openSuccessMessage("Vehicle updated successfully!");
  };

  const goBack = () => {
    navigate("/vehicles"); // Adjust the navigation path as needed
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        breadCrumb={["Home", "Vehicles", "Edit Vehicle"]}
      >
        <FormGenerator
          fields={fields} // Use the vehicle form fields
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Update Vehicle"}
          view={view}
        />
      </MainTemplate>
      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to update this vehicle?"
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

export default EditVehiclePage;
