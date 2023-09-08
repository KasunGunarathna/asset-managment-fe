import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
import {
  editBridge,
  fetchBridgeById,
  selectBridge,
} from "../../store/bridgeSlice";
import { Bridge } from "../../types/types";
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import MainTemplate from "../../templates/MainTemplate";
import { clearToken, fetchLoginUser, selectAuth } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";

const validationSchema = yup.object({
  bridge_name: yup.string().required("Bridge Name is required"),
  road_name: yup.string().required("Road Name is required"),
  latitude: yup
    .number()
    .required("Latitude is required")
    .min(-90, "Latitude must be greater than or equal to -90")
    .max(90, "Latitude must be less than or equal to 90"),
  longitude: yup
    .number()
    .required("Longitude is required")
    .min(-180, "Longitude must be greater than or equal to -180")
    .max(180, "Longitude must be less than or equal to 180"),
  length: yup
    .number()
    .required("Length is required")
    .positive("Length must be a positive number"),
  width: yup
    .number()
    .required("Width is required")
    .positive("Width must be a positive number"),
  structure_condition: yup.string().required("Structure Condition is required"),
  road_surface_condition: yup
    .string()
    .required("Road Surface Condition is required"),
  remarks: yup.string(),
});

const EditBridgePage = () => {
  const nic = sessionStorage.getItem("userNic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, bridge } = useSelector(selectBridge);
  const { logUser } = useSelector(selectAuth);
  const { id, view } = useParams();

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchBridgeById(id));
  }, [nic, id, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const formik = useFormik({
    initialValues: {
      bridge_name: bridge?.bridge_name || "",
      road_name: bridge?.road_name || "",
      latitude: bridge?.latitude || 0,
      longitude: bridge?.longitude || 0,
      length: bridge?.length || 0,
      width: bridge?.width || 0,
      structure_condition: bridge?.structure_condition || "",
      road_surface_condition: bridge?.road_surface_condition || "",
      remarks: bridge?.remarks || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Bridge) => {
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
    dispatch(editBridge(id, formik.values));
    closeModal();
    dispatch(fetchBridgeById(id));
    formik.resetForm();
    openSuccessMessage("Bridge updated successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const goBack = () => {
    navigate("/bridges");
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Bridges", "Add Bridge"]}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="bridge_name"
                label="Bridge Name"
                fullWidth
                value={formik.values.bridge_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.bridge_name &&
                  Boolean(formik.errors.bridge_name)
                }
                helperText={
                  formik.touched.bridge_name && formik.errors.bridge_name
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="road_name"
                label="Road Name"
                fullWidth
                value={formik.values.road_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.road_name &&
                  Boolean(formik.errors.road_name)
                }
                helperText={
                  formik.touched.road_name && formik.errors.road_name
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="latitude"
                label="Latitude"
                fullWidth
                type="number"
                value={formik.values.latitude}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.latitude && Boolean(formik.errors.latitude)
                }
                helperText={formik.touched.latitude && formik.errors.latitude}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="longitude"
                label="Longitude"
                fullWidth
                type="number"
                value={formik.values.longitude}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.longitude && Boolean(formik.errors.longitude)
                }
                helperText={formik.touched.longitude && formik.errors.longitude}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="length"
                label="Length (meters)"
                fullWidth
                type="number"
                value={formik.values.length}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.length && Boolean(formik.errors.length)}
                helperText={formik.touched.length && formik.errors.length}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="width"
                label="Width (meters)"
                fullWidth
                type="number"
                value={formik.values.width}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.width && Boolean(formik.errors.width)}
                helperText={formik.touched.width && formik.errors.width}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="structure_condition"
                label="Structure Condition"
                fullWidth
                value={formik.values.structure_condition}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.structure_condition &&
                  Boolean(formik.errors.structure_condition)
                }
                helperText={
                  formik.touched.structure_condition &&
                  formik.errors.structure_condition
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={view ? true : false}
                name="road_surface_condition"
                label="Road Surface Condition"
                fullWidth
                value={formik.values.road_surface_condition}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.road_surface_condition &&
                  Boolean(formik.errors.road_surface_condition)
                }
                helperText={
                  formik.touched.road_surface_condition &&
                  formik.errors.road_surface_condition
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={view ? true : false}
                name="remarks"
                label="Remarks"
                fullWidth
                multiline
                rows={2}
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                helperText={formik.touched.remarks && formik.errors.remarks}
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
                    Update Bridge
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
        content="Are you sure you want to update this bridge?"
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

export default EditBridgePage;
