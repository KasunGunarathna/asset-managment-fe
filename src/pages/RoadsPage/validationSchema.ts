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
  starting_point_location: yup
    .string()
    .required("Starting Point Location is required"),
  starting_point_photo: yup.string(),
  end_point_location: yup.string().required("End Point Location is required"),
  end_point_photo: yup.string(),
  drainage_availability: yup
    .string()
    .required("Drainage Availability is required"),
});
