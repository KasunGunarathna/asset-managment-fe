import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, fetchLoginUser, selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { editUser, fetchUserById, selectUser } from "../../store/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { User } from "../../types/types";
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { simpleDecrypt } from "../../utils/hash";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const encryptionKey = "mysecretkey";
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  nic: yup.string().required("NIC is required"),
  user_type: yup.string().required("User Type is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

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
  const [showPassword, setShowPassword] = useState(false);

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
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="name"
                label="Name"
                fullWidth
                value={view ? user?.name || '' : formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="nic"
                label="NIC"
                fullWidth
                value={view ? user?.nic || '' : formik.values.nic}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nic && Boolean(formik.errors.nic)}
                helperText={formik.touched.nic && formik.errors.nic}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="user_type">User Type</InputLabel>
                <Select
                  disabled={view ? true : false}
                  name="user_type"
                  label="User Type"
                  fullWidth
                  value={view ? user?.user_type || '' : formik.values.user_type || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.user_type && Boolean(formik.errors.user_type)
                  }
                >
                  <MenuItem value="" disabled>
                    <em>Select User Type</em>
                  </MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Collector">Collector</MenuItem>
                  <MenuItem value="Viewer">Viewer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="password"
                label="Password"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={view ? simpleDecrypt(user?.password, encryptionKey) || '' : formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Button onClick={goBack} variant="outlined" color="primary">
                  Cancel
                </Button>
                {view ? (
                  <></>
                ) : (
                  <Button type="submit" variant="contained" color="primary">
                    Update User
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
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
