import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearToken,
  fetchLoginUser,
  selectAuth,
} from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { addUser, fetchUsers, selectUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { User } from "../../types/types";

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

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, users, loading, error } = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchUsers());
  }, [nic, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      nic: "",
      user_type: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: User) => {
      console.log("values");
      dispatch(addUser(values));
      formik.resetForm();
    },
  });

  

  return (
    <>
      <MainTemplate
        userDetails={auth.loginUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Users", "Add User"]}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            name="nic"
            label="NIC"
            fullWidth
            value={formik.values.nic}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nic && Boolean(formik.errors.nic)}
            helperText={formik.touched.nic && formik.errors.nic}
          />
          <TextField
            name="user_type"
            label="User Type"
            fullWidth
            value={formik.values.user_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.user_type && Boolean(formik.errors.user_type)}
            helperText={formik.touched.user_type && formik.errors.user_type}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
        </form>
      </MainTemplate>
    </>
  );
};

export default AddUsersPage;
