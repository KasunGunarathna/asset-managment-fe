import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "name", label: "Name" },
  { name: "user_type", label: "User Type" },
  { name: "nic", label: "NIC" },
  { name: "password", label: "Password" ,password:true }, // Assuming it's a password input
  // Add more form fields as needed
];