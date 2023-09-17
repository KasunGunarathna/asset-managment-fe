import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "bridge_name", label: "Bridge Name" },
  { name: "road_name", label: "Road Name" },
  { name: "latitude", label: "Latitude", type: "number" },
  { name: "longitude", label: "Longitude", type: "number" },
  { name: "length", label: "Length (meters)", type: "number" },
  { name: "width", label: "Width (meters)", type: "number" },
  { name: "structure_condition", label: "Structure Condition" },
  { name: "road_surface_condition", label: "Road Surface Condition" },
  { name: "remarks", label: "Remarks" },
  // Add more form fields as needed
];
