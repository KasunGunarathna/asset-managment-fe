// validationSchema.ts

import * as yup from "yup";

export const bridgeValidationSchema = yup.object({
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
  remarks: yup.string().required("Remarks are required"),
  // Add more validation rules for other fields as needed
});
