import { DrainageType, SideOfDrain } from "../../types/enum";
import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "road_name", label: "Road Name" },
  { name: "drainage_type", label: "Drainage Type", select: true, options: Object.values(DrainageType) },
  { name: "side_of_drain", label: "Side of Drain", select: true, options: Object.values(SideOfDrain) },
  { name: "starting_point_latitude", label: "Starting Point Latitude", type: "number" },
  { name: "starting_point_longitude", label: "Starting Point Longitude", type: "number" },
  { name: "end_point_latitude", label: "End Point Latitude", type: "number" },
  { name: "end_point_longitude", label: "End Point Longitude", type: "number" },
  { name: "condition", label: "Condition" },
  { name: "length", label: "Length (meters)", type: "number" },
  { name: "width", label: "Width (meters)", type: "number" },
  // You can add more fields as needed
];
