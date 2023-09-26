import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { selectBuildings } from "../../store/buildingSlice"; // Import building-related actions and selectors
import { Building } from "../../types/types"; // Import the Building type
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import MainTemplate from "../../templates/MainTemplate";
import { selectAuth } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";
import { validationSchema } from "./validationSchema";
import FormGenerator from "../../components/common/FormGenerator";
import { fields } from "./formFields";
import { fetchLoginUser } from "../../services/authService";
import {
  editBuilding,
  fetchBuildingById,
  imageUploadBuilding,
} from "../../services/buildingService"; // Import your building service functions
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import { useImageModal } from "../../hooks/useImageModal";
import ImageViewModal from "../../components/common/ImageViewModal";

const EditBuildingPage = () => {
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
  const { loading, error, building ,photo} = useSelector(selectBuildings); // Use the appropriate selector for buildings
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();

  const { openImageModal, selectedImage, handleOpenModal, handleCloseModal } =
  useImageModal();

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchBuildingById(id)); // Fetch building data by ID
  }, [nic, id, dispatch]);

  const formik = useFormik({
    initialValues: {
      // Initialize with your Building field names and default values
      name: building?.name || "",
      plan: building?.plan || "",
      number_of_stories: building?.number_of_stories || 0,
      photo: building?.photoUrl || "",
      location: building?.location || "",
      built_year: building?.built_year || 0,
      condition: building?.condition || "",
      remark: building?.remark || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Building) => {
      openModal();
    },
    enableReinitialize: true,
  });

  const handleConfirm = async () => {

    const image: any = formik.values.photo || photo;
    let data: Building = formik.values;
    delete data.photo;

    await dispatch(editBuilding(id, data));
    const formData = new FormData();
    if (image !== undefined) {
      formData.append("file", image);
      await dispatch(imageUploadBuilding(id, formData));
    }
    closeModal();
    await dispatch(fetchBuildingById(id));
    await formik.setFieldValue("photo", building?.photoUrl);
    openSuccessMessage("Building updated successfully!");
  };

  const goBack = () => {
    navigate("/buildings");
  };
  const onPhotoHandle = async (name: any, selectedFile: any) => {
    await formik.setFieldValue(`${name}`, selectedFile);
  };
  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        breadCrumb={[
          "Home",
          "Buildings",
          view === "true" ? "View Building" : "Edit Building",
        ]}
      >
        <FormGenerator
          fields={fields} // Use your building form fields here
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={view === "true" ? "View Building" : "Update Building"}
          view={view}
          onPhoto={onPhotoHandle}
          handleOpenModal={handleOpenModal}
        />
      </MainTemplate>
      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content={`Are you sure you want to ${
          view === "true" ? "view" : "update"
        } this building?`}
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

export default EditBuildingPage;
