import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, fetchLoginUser, selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { editUser, fetchUserById, selectUser } from "../../store/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import { User } from "../../types/types";
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { simpleDecrypt } from "../../utils/hash";
import { validationSchema } from "./validationSchema";
import FormGenerator from "../../components/common/FormGenerator";
import { fields } from "./formFields";

const encryptionKey = "mysecretkey";

const AddUsersPage = () => {
  const nic = sessionStorage.getItem("userNic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(selectUser);
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchUserById(id));
  }, [nic, id, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const formik = useFormik({
    initialValues: {
      name: user?.name,
      nic: user?.nic,
      user_type: user?.user_type,
      password: simpleDecrypt(user?.password, encryptionKey) || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: User) => {
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

  const handleConfirm = () => {
    dispatch(editUser(id, formik.values));
    closeModal();
    dispatch(fetchUserById(id));
    formik.resetForm();
    openSuccessMessage("User updated successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const goBack = () => {
    navigate("/users");
  };
  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Users", view ? "View User" : "Edit User"]}
      >
        <FormGenerator
          fields={fields}
          formik={formik}
          onSubmit={formik.handleSubmit}
          goBack={goBack}
          name={"Edit User"}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          view={view}
        />
      </MainTemplate>

      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to update this user?"
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

export default AddUsersPage;
