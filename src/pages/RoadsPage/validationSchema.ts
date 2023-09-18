import * as yup from "yup";

export const validationSchema = yup.object({
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
  starting_point_photo: yup.string(),
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
  end_point_photo: yup.string(),
  drainage_availability: yup
    .string()
    .required("Drainage Availability is required"),
});
