import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, fetchLoginUser, selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Road } from "../../types/types"; // Import the Road type
import CustomSnackbar from "../../components/common/Snackbar";
import CustomDialog from "../../components/common/CustomDialog";
import PageLoader from "../../components/PageLoader";
import { addRoad, selectRoad } from "../../store/roadSlice"; // Import the road related actions and selectors
import { DrainageAvailability, PavementType, SurfaceCondition } from "../../types/enum";

const validationSchema = yup.object({
  road_name: yup.string().required("Road Name is required"),
  length: yup
    .number()
    .required("Length is required")
    .positive("Length must be a positive number"),
  width: yup
    .number()
    .required("Width is required")
    .positive("Width must be a positive number"),
  gazetted_detail: yup.string().required("Gazetted Detail is required"),
  survey_plan: yup.string().required("Survey Plan is required"),
  surface_condition: yup.string().required("Surface Condition is required"),
  pavement_type: yup.string().required("Pavement Type is required"),
  starting_point_latitude: yup
    .number()
    .required("Starting Point Latitude is required")
    .min(-90, "Latitude must be greater than or equal to -90")
    .max(90, "Latitude must be less than or equal to 90"),
  starting_point_longitude: yup
    .number()
    .required("Starting Point Longitude is required")
    .min(-180, "Longitude must be greater than or equal to -180")
    .max(180, "Longitude must be less than or equal to 180"),
  starting_point_photo: yup
    .string()
    .required("Starting Point Photo is required"),
  end_point_latitude: yup
    .number()
    .required("End Point Latitude is required")
    .min(-90, "Latitude must be greater than or equal to -90")
    .max(90, "Latitude must be less than or equal to 90"),
  end_point_longitude: yup
    .number()
    .required("End Point Longitude is required")
    .min(-180, "Longitude must be greater than or equal to -180")
    .max(180, "Longitude must be less than or equal to 180"),
  end_point_photo: yup.string().required("End Point Photo is required"),
  drainage_availability: yup
    .string()
    .required("Drainage Availability is required"),
});

const AddRoadPage = () => {
  const nic = sessionStorage.getItem("userNic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectRoad);
  const { logUser } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
  }, [nic, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const formik = useFormik({
    initialValues: {
      road_name: "",
      length: 0.0,
      width: 0.0,
      gazetted_detail: "",
      survey_plan: "",
      surface_condition: "",
      pavement_type: "",
      starting_point_latitude: 0.0,
      starting_point_longitude: 0.0,
      starting_point_photo: "",
      end_point_latitude: 0.0,
      end_point_longitude: 0.0,
      end_point_photo: "",
      drainage_availability: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Road) => {
      openModal();
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    await dispatch(addRoad(formik.values));
    closeModal();
    // formik.resetForm();
    openSuccessMessage("Road added successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const goBack = () => {
    navigate("/roads"); // Update the route to navigate back to roads
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Roads", "Add Road"]}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="road_name"
                label="Road Name"
                fullWidth
                value={formik.values.road_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.road_name && Boolean(formik.errors.road_name)
                }
                helperText={formik.touched.road_name && formik.errors.road_name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
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
                name="gazetted_detail"
                label="Gazetted Detail"
                fullWidth
                value={formik.values.gazetted_detail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.gazetted_detail &&
                  Boolean(formik.errors.gazetted_detail)
                }
                helperText={
                  formik.touched.gazetted_detail &&
                  formik.errors.gazetted_detail
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="survey_plan"
                label="Survey Plan"
                fullWidth
                value={formik.values.survey_plan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.survey_plan &&
                  Boolean(formik.errors.survey_plan)
                }
                helperText={
                  formik.touched.survey_plan && formik.errors.survey_plan
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Surface Condition</InputLabel>
                <Select
                  name="surface_condition"
                  value={formik.values.surface_condition}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.surface_condition &&
                    Boolean(formik.errors.surface_condition)
                  }
                >
                  {Object.values(SurfaceCondition).map((condition) => (
                    <MenuItem value={condition}>{condition}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Pavement Type</InputLabel>
                <Select
                  name="pavement_type"
                  value={formik.values.pavement_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.pavement_type &&
                    Boolean(formik.errors.pavement_type)
                  }
                >
                  <MenuItem value="" disabled>
                    <em>Select Pavement Type</em>
                  </MenuItem>
                  {Object.values(PavementType).map((type) => (
                    <MenuItem value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="starting_point_latitude"
                label="Starting Point Latitude"
                fullWidth
                type="number"
                value={formik.values.starting_point_latitude}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.starting_point_latitude &&
                  Boolean(formik.errors.starting_point_latitude)
                }
                helperText={
                  formik.touched.starting_point_latitude &&
                  formik.errors.starting_point_latitude
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="starting_point_longitude"
                label="Starting Point Longitude"
                fullWidth
                type="number"
                value={formik.values.starting_point_longitude}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.starting_point_longitude &&
                  Boolean(formik.errors.starting_point_longitude)
                }
                helperText={
                  formik.touched.starting_point_longitude &&
                  formik.errors.starting_point_longitude
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="starting_point_photo"
                label="Starting Point Photo"
                fullWidth
                value={formik.values.starting_point_photo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.starting_point_photo &&
                  Boolean(formik.errors.starting_point_photo)
                }
                helperText={
                  formik.touched.starting_point_photo &&
                  formik.errors.starting_point_photo
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="end_point_latitude"
                label="End Point Latitude"
                fullWidth
                type="number"
                value={formik.values.end_point_latitude}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.end_point_latitude &&
                  Boolean(formik.errors.end_point_latitude)
                }
                helperText={
                  formik.touched.end_point_latitude &&
                  formik.errors.end_point_latitude
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="end_point_longitude"
                label="End Point Longitude"
                fullWidth
                type="number"
                value={formik.values.end_point_longitude}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.end_point_longitude &&
                  Boolean(formik.errors.end_point_longitude)
                }
                helperText={
                  formik.touched.end_point_longitude &&
                  formik.errors.end_point_longitude
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="end_point_photo"
                label="End Point Photo"
                fullWidth
                value={formik.values.end_point_photo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.end_point_photo &&
                  Boolean(formik.errors.end_point_photo)
                }
                helperText={
                  formik.touched.end_point_photo &&
                  formik.errors.end_point_photo
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Drainage Availability</InputLabel>
                <Select
                  name="drainage_availability"
                  value={formik.values.drainage_availability}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.drainage_availability &&
                    Boolean(formik.errors.drainage_availability)
                  }
                >
                  {Object.values(DrainageAvailability).map((availability) => (
                    <MenuItem value={availability}>
                      {availability}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Button onClick={goBack} variant="outlined" color="primary">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Add Road
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </MainTemplate>

      <CustomDialog
        open={isModalOpen}
        title="Confirmation"
        content="Are you sure you want to add this road?"
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

export default AddRoadPage;
