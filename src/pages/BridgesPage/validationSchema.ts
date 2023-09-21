// validationSchema.ts

import * as yup from "yup";

export const validationSchema = yup.object({
  bridge_name: yup.string().required("Bridge Name is required"),
  road_name: yup.string().required("Road Name is required"),
  location: yup
    .string()
    .required("Location is required"),
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
