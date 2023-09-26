import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Building Name is required"),
  plan: yup.string().required("Building Plan is required"),
  number_of_stories: yup
    .number()
    .required("Number of Stories is required")
    .integer("Number of Stories must be an integer")
    .positive("Number of Stories must be a positive number"),
  location: yup.string().required("Building Location is required"),
  builtYear: yup
    .number()
    .required("Built Year is required")
    .integer("Built Year must be an integer")
    .positive("Built Year must be a positive number"),
  condition: yup.string().required("Building Condition is required"),
  remark: yup.string(),
  // You can add more validation rules as needed
});
