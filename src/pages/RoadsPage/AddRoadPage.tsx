import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import { Road } from "../../types/types"; // Import the Road type
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { selectRoad } from "../../store/roadSlice";
import FormGenerator from "../../components/common/FormGenerator";
import { validationSchema } from "./validationSchema";
import { fields } from "./formFields";
import { fetchLoginUser } from "../../services/authService";
import { addRoad, imageUploadRoad } from "../../services/roadService";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";

const AddRoadPage = () => {
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
  const { loading, error } = useSelector(selectRoad);
  const { logUser } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
  }, [nic, dispatch]);

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

  const handleConfirm = async () => {
    const image1: any = formik.values.starting_point_photo;
    const image2: any = formik.values.end_point_photo;
    let data: Road = formik.values;
    delete data.starting_point_photo;
    delete data.end_point_photo;
    const res = await dispatch(addRoad(formik.values));
    if (image1) {
      const formData = new FormData();
      formData.append("file", image1);
      await dispatch(imageUploadRoad(res.id, formData, 1));
    }
    if (image2) {
      const formData = new FormData();
      formData.append("file", image2);
      await dispatch(imageUploadRoad(res.id, formData, 2));
    }

    closeModal();
    formik.resetForm();
    await formik.setFieldValue("starting_point_photo", null);
    await formik.setFieldValue("end_point_photo", null);
    openSuccessMessage("Road added successfully!");
  };

  const goBack = () => {
    navigate("/roads");
  };

  const onPhotoHandle = async (name: any, selectedFile: any) => {
    await formik.setFieldValue(`${name}`, selectedFile);
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        breadCrumb={["Home", "Roads", "Add Road"]}
      >
        <FormGenerator
          fields={fields}
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Add Road"}
          onPhoto={onPhotoHandle}
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
        onClose={() => closeSuccessMessage()}
        message={successMessage}
        error={error}
      />
    </>
  );
};

export default AddRoadPage;
