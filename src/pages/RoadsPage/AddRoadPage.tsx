import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, fetchLoginUser, selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import { Road } from "../../types/types"; // Import the Road type
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { addRoad, selectRoad } from "../../store/roadSlice";
import FormGenerator from "../../components/common/FormGenerator";
import { validationSchema } from "./validationSchema";
import { fields } from "./formFields";

const AddRoadPage = () => {
  const nic = sessionStorage.getItem("userNic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectRoad);
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
      road_name: "",
      length: 0.0,
      width: 0.0,
      gazetted_detail: "",
      survey_plan: "",
      surface_condition: "",
      pavement_type: "",
      starting_point_latitude: 0.0,
      starting_point_longitude: 0.0,
      starting_point_photo: "",
      end_point_latitude: 0.0,
      end_point_longitude: 0.0,
      end_point_photo: "",
      drainage_availability: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Road) => {
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
    await dispatch(addRoad(formik.values));
    closeModal();
    formik.resetForm();
    openSuccessMessage("Road added successfully!");
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
        breadCrumb={["Home", "Roads", "Add Road"]}
      >
        <FormGenerator
          fields={fields}
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Add Road"}
        />
      </MainTemplate>

      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to add this road?"
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

export default AddRoadPage;
