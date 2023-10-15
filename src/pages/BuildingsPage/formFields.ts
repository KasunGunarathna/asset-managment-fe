import { SurfaceCondition } from "../../types/enum";
import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "name", label: "Building Name" },
  { name: "plan", label: "Building Plan" },
  { name: "number_of_stories", label: "Number of Stories", type: "number" },
  { name: "photo", label: "Building Photo", photo: true },
  { name: "location", label: "Building Location" },
  { name: "built_year", label: "Built Year", type: "number" },
  {
    name: "condition",
    label: "Building Condition",
    select: true,
    options: Object.values(SurfaceCondition),
  },
  { name: "remark", label: "Remarks" },
];
