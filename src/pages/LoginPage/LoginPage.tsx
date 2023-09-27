import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserCredentials } from "../../types/types";
import { userLogin } from "../../services/authService";

const validationSchema = yup.object({
  nic: yup.string().required("NIC is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector(selectAuth);
  const formik = useFormik({
    initialValues: {
      nic: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: UserCredentials) => {
      handleLogin(values);
    },
  });
  const handleLogin = async (values: UserCredentials) => {
    try {
      await dispatch(userLogin(values));
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 2, width: "100%", textAlign: "center" }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          mx="auto"
        >
          <img
            src={logoImage}
            alt="Logo"
            style={{
              width: "100px",
              height: "auto",
            }}
          />
          <Typography variant="h4">Asset Management System</Typography>
          <Typography variant="h6">Kaduwela Municipal Council</Typography>
          <Typography variant="subtitle1">Sri Lanka</Typography>
        </Box>
        <form onSubmit={formik.handleSubmit} style={{ padding: "5px" }}>
          <Grid
            container
            direction={"column"}
            spacing={3}
            sx={{ marginTop: "5px" }}
          >
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="password"
                name="password"
                label="Password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && <Typography color="red">{error}</Typography>}
      </Paper>
    </Container>
  );
};

export default LoginPage;
