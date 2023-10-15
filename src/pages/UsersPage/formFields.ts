import { UserType } from "../../types/enum";
import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "name", label: "Name" },
  {
    name: "user_type",
    label: "User Type",
    select: true,
    options: Object.values(UserType),
  },
  { name: "nic", label: "NIC" },
  { name: "password", label: "Password", password: true },
];
