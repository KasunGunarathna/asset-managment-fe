import * as yup from "yup";

export const validationSchema = yup.object({
  pole_number: yup.string().required("Pole Number is required"),
  road_name: yup.string().required("Road Name is required"),
  wire_condition: yup.string().required("Wire Condition is required"),
  switch_condition: yup.string().required("Switch Condition is required"),
  pole_type: yup.string().required("Pole Type is required"),
  lamp_type: yup.string().required("Lamp Type is required"),
  // photo: yup.string().required("Photo is required"),
  // You can add more validation rules as needed
});
