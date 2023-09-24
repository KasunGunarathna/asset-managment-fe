import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { selectRoad } from "../../store/roadSlice"; // Import road-related actions and selectors
import { Road } from "../../types/types"; // Import the Road type
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
  editRoad,
  fetchRoadById,
  imageUploadRoad,
} from "../../services/roadService";
import { useImageModal } from "../../hooks/useImageModal";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";
import ImageViewModal from "../../components/common/ImageViewModal";

const EditRoadPage = () => {
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
  const { loading, error, road } = useSelector(selectRoad);
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();
  const { openImageModal, selectedImage, handleOpenModal, handleCloseModal } =
    useImageModal();
  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchRoadById(id)); // Fetch road data by ID
  }, [nic, id, dispatch]);

  const formik = useFormik({
    initialValues: {
      road_name: road?.road_name || "",
      length: road?.length || 0,
      width: road?.width || 0,
      gazetted_detail: road?.gazetted_detail || "",
      survey_plan: road?.survey_plan || "",
      surface_condition: road?.surface_condition || "",
      pavement_type: road?.pavement_type || "",
      starting_point_location: road?.starting_point_location || "",
      starting_point_photo: road?.startingPhotoUrl || "",
      end_point_location: road?.end_point_location || "",
      end_point_photo: road?.endPhotoUrl || "",
      drainage_availability: road?.drainage_availability || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Road) => {
      openModal();
    },
    enableReinitialize: true,
  });

  const handleConfirm = async () => {
    const image1: any = formik.values.starting_point_photo;
    const image2: any = formik.values.end_point_photo;
    let data: Road = formik.values;
    delete data.starting_point_photo;
    delete data.end_point_photo;
    await dispatch(editRoad(id, formik.values));

    if (image1 !== undefined) {
      const formData = new FormData();
      formData.append("file", image1);
      await dispatch(imageUploadRoad(id, formData, 1));
    }
    if (image2 !== undefined) {
      const formData = new FormData();
      formData.append("file", image2);
      await dispatch(imageUploadRoad(id, formData, 2));
    }
    closeModal();
    await dispatch(fetchRoadById(id));
    await formik.setFieldValue("starting_point_photo", road?.startingPhotoUrl);
    await formik.setFieldValue("end_point_photo", road?.endPhotoUrl);

    openSuccessMessage("Road updated successfully!");
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
        breadCrumb={["Home", "Roads", "Edit Road"]}
      >
        <FormGenerator
          fields={fields}
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Update Road"}
          view={view}
          onPhoto={onPhotoHandle}
          handleOpenModal={handleOpenModal}
        />
      </MainTemplate>
      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to update this road?"
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

export default EditRoadPage;
