import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  editStreetLight,
  fetchStreetLightById,
  imageGetStreetLight,
  imageUploadStreetLight,
} from "../../services/StreetLightService";
import { StreetLight } from "../../types/types";
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import MainTemplate from "../../templates/MainTemplate";
import { selectAuth } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";
import { validationSchema } from "./validationSchema";
import FormGenerator from "../../components/common/FormGenerator";
import { fields } from "./formFields";
import ImageViewModal from "../../components/common/ImageViewModal";
import { selectStreetLights } from "../../store/streetLightSlice";
import { fetchLoginUser } from "../../services/authService";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import { useImageModal } from "../../hooks/useImageModal";

const EditStreetLightPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, streetLight, photo } =
    useSelector(selectStreetLights);
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();

  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    successMessage,
    isSuccessOpen,
    openSuccessMessage,
    closeSuccessMessage,
  } = useSuccessMessage();

  const { openImageModal, selectedImage, handleOpenModal, handleCloseModal } =
    useImageModal();

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchStreetLightById(id));
    dispatch(imageGetStreetLight(id));
  }, [nic, id, dispatch]);

  const formik = useFormik({
    initialValues: {
      pole_number: streetLight?.pole_number || "",
      road_name: streetLight?.road_name || "",
      wire_condition: streetLight?.wire_condition || "",
      switch_condition: streetLight?.switch_condition || "",
      pole_type: streetLight?.pole_type || "",
      lamp_type: streetLight?.lamp_type || "",
      photo: streetLight?.photoUrl || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: StreetLight) => {
      openModal();
    },
    enableReinitialize: true,
  });

  const handleConfirm = async () => {
    const image: any = formik.values.photo || photo;
    let data: StreetLight = formik.values;
    delete data.photo;

    await dispatch(editStreetLight(id, data));
    const formData = new FormData();
    if (image !== undefined) {
      formData.append("file", image);
      await dispatch(imageUploadStreetLight(id, formData));
    }
    closeModal();
    await dispatch(fetchStreetLightById(id));
    await formik.setFieldValue("photo", streetLight?.photoUrl);
    openSuccessMessage("Street light updated successfully!");
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
        breadCrumb={["Home", "Street Lights", "Edit Street Light"]}
      >
        <FormGenerator
          fields={fields}
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Update Street Light"}
          view={view}
          onPhoto={onPhotoHandle}
          handleOpenModal={handleOpenModal}
        />
      </MainTemplate>
      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to update this street light?"
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
      <CustomSnackbar
        open={isSuccessOpen}
        onClose={() => closeSuccessMessage()}
        message={successMessage}
        error={error}
      />

      <ImageViewModal
        open={openImageModal}
        onClose={handleCloseModal}
        imageURL={selectedImage}
      />
    </>
  );
};

export default EditStreetLightPage;
