import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { selectUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import { User } from "../../types/types";
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { validationSchema } from "./validationSchema";
import FormGenerator from "../../components/common/FormGenerator";
import { fields } from "./formFields";
import { fetchLoginUser } from "../../services/authService";
import { addUser } from "../../services/userService";
import { useModal } from "../../hooks/useModal";
import { useSuccessMessage } from "../../hooks/useSuccessMessage";

const AddUsersPage = () => {
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
  const { loading, error } = useSelector(selectUser);
  const { logUser } = useSelector(selectAuth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
  }, [nic, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      nic: "",
      user_type: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: User) => {
      openModal();
    },
  });

  const handleConfirm = async () => {
    await dispatch(addUser(formik.values));
    closeModal();
    formik.resetForm();
    openSuccessMessage("User added successfully!");
  };

  const goBack = () => {
    navigate("/users");
  };
  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        breadCrumb={["Home", "Users", "Add User"]}
      >
        <FormGenerator
          fields={fields}
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Add User"}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </MainTemplate>

      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to add this user?"
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

export default AddUsersPage;
