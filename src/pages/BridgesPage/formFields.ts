import { SurfaceCondition } from "../../types/enum";
import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "bridge_name", label: "Bridge Name" },
  { name: "road_name", label: "Road Name" },
  { name: "location", label: "Latitude, Longitude" },
  { name: "length", label: "Length (meters)", type: "number" },
  { name: "width", label: "Width (meters)", type: "number" },
  {
    name: "structure_condition",
    label: "Structure Condition",
    select: true,
    options: Object.values(SurfaceCondition),
  },
  {
    name: "road_surface_condition",
    label: "Road Surface Condition",
    select: true,
    options: Object.values(SurfaceCondition),
  },
  { name: "remarks", label: "Remarks" },
  // Add more form fields as needed
];
