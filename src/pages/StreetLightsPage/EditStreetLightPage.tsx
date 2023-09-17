import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  editStreetLight,
  fetchStreetLightById,
  imageGetStreetLight,
  imageUploadStreetLight,
  selectStreetLights,
} from "../../store/streetLightSlice"; // Import street light-related actions and selectors
import { StreetLight } from "../../types/types"; // Import the StreetLight type
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import MainTemplate from "../../templates/MainTemplate";
import { clearToken, fetchLoginUser, selectAuth } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";
import { validationSchema } from "./validationSchema";
import FormGenerator from "../../components/common/FormGenerator";
import { fields } from "./formFields";
import ImageViewModal from "../../components/common/ImageViewModal";

const EditStreetLightPage = () => {
  const nic = sessionStorage.getItem("userNic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, streetLight, photo } =
    useSelector(selectStreetLights); // Use the appropriate selector for street lights
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchStreetLightById(id)); // Fetch street light data by ID
    dispatch(imageGetStreetLight(id));
  }, [nic, id, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };
  const formik = useFormik({
    initialValues: {
      // Initialize with your StreetLight field names and default values
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    console.log(formik.values);
    const image: any = formik.values.photo || photo;
    let data: StreetLight = formik.values;
    delete data.photo;
    console.log(data);

    await dispatch(editStreetLight(id, data));
    const formData = new FormData();
    if (image !== undefined) {
      formData.append("file", image);
      console.log(formData);
      await dispatch(imageUploadStreetLight(id, formData));
    }
    closeModal();
    dispatch(fetchStreetLightById(id));
    formik.setFieldValue("photo", streetLight?.photoUrl);
    openSuccessMessage("Street light updated successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const goBack = () => {
    navigate("/street_lights");
  };
  const onPhotoHandle = (name: any, selectedFile: any) => {
    formik.setFieldValue(`${name}`, selectedFile);
    console.log(formik);
  };

  const handleOpenModal = (imageURL: string) => {
    console.log(imageURL);
    setSelectedImage(imageURL);
    setOpenImageModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setOpenImageModal(false);
  };
  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Street Lights", "Edit Street Light"]}
      >
        <FormGenerator
          fields={fields} // Use your street light form fields here
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
        onClose={() => setIsSuccessOpen(false)}
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
