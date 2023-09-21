import { DrainageType, SideOfDrain, SurfaceCondition } from "../../types/enum";
import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "road_name", label: "Road Name" },
  {
    name: "drainage_type",
    label: "Drainage Type",
    select: true,
    options: Object.values(DrainageType),
  },
  {
    name: "side_of_drain",
    label: "Side of Drain",
    select: true,
    options: Object.values(SideOfDrain),
  },
  {
    name: "starting_point_location",
    label: "Starting Point Latitude, Longitude",
  },
  { name: "end_point_location", label: "End Point Latitude, Longitude" },
  {
    name: "condition",
    label: "Condition",
    select: true,
    options: Object.values(SurfaceCondition),
  },
  { name: "length", label: "Length (meters)", type: "number" },
  { name: "width", label: "Width (meters)", type: "number" },
  // You can add more fields as needed
];
