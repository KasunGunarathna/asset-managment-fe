import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import { Bridge } from "../../types/types";
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { selectBridge } from "../../store/bridgeSlice";
import { validationSchema } from "../RoadsPage/validationSchema";
import FormGenerator from "../../components/common/FormGenerator";
import { fields } from "./formFields";
import { fetchLoginUser } from "../../services/authService";
import { addBridge } from "../../services/bridgeService";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";

const AddBridgePage = () => {
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
  const { loading, error } = useSelector(selectBridge);
  const { logUser } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
  }, [nic, dispatch]);

  const formik = useFormik({
    initialValues: {
      bridge_name: "",
      road_name: "",
      latitude: 0.0,
      longitude: 0.0,
      length: 0.0,
      width: 0.0,
      structure_condition: "",
      road_surface_condition: "",
      remarks: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Bridge) => {
      openModal();
    },
  });

  const handleConfirm = async () => {
    await dispatch(addBridge(formik.values));
    closeModal();
    formik.resetForm();
    openSuccessMessage("Bridge added successfully!");
  };

  const goBack = () => {
    navigate("/bridges");
  };
  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        breadCrumb={["Home", "Bridges", "Add Bridge"]}
      >
        <FormGenerator
          fields={fields}
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Add Bridge"}
        />
      </MainTemplate>

      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to add this bridge?"
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

export default AddBridgePage;
