import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  nic: yup.string().required("NIC is required"),
  user_type: yup.string().required("User Type is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});