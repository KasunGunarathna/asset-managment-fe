import { SurfaceCondition } from "../../types/enum"; // Import relevant enums if needed
import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "name", label: "Building Name" },
  { name: "plan", label: "Building Plan" },
  { name: "number_of_stories", label: "Number of Stories", type: "number" },
  { name: "photo", label: "Building Photo URL" },
  { name: "location", label: "Building Location" },
  { name: "builtYear", label: "Built Year", type: "number" },
  {
    name: "condition",
    label: "Building Condition",
    select: true,
    options: Object.values(SurfaceCondition), // Use the appropriate enum for building condition
  },
  { name: "remark", label: "Remarks" },
  // You can add more fields as needed
];
