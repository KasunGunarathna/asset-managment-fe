import * as yup from "yup";

export const validationSchema = yup.object({
  road_name: yup.string().required("Road Name is required"),
  drainage_type: yup.string().required("Type of Drain is required"),
  side_of_drain: yup.string().required("Side of the Drain is required"),
  starting_point_location: yup
    .string()
    .required("Starting Point Location is required"),
  end_point_location: yup
    .string()
    .required("End Point Location is required"),
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
