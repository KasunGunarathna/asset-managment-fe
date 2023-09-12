import * as yup from "yup";

export const validationSchema = yup.object({
  road_name: yup.string().required("Road Name is required"),
  drainage_type: yup.string().required("Type of Drain is required"),
  side_of_drain: yup.string().required("Side of the Drain is required"),
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
  condition: yup.string().required("Condition is required"),
  length: yup
    .number()
    .required("Length is required")
    .positive("Length must be a positive number"),
  width: yup
    .number()
    .required("Width is required")
    .positive("Width must be a positive number"),
  // You can add more validation rules as needed
});
