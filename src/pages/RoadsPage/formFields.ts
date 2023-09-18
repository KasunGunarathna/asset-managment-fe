import {
  DrainageAvailability,
  PavementType,
  SurfaceCondition,
} from "../../types/enum";
import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "road_name", label: "Road Name" },
  { name: "length", label: "Length (meters)", type: "number" },
  { name: "width", label: "Width (meters)", type: "number" },
  { name: "gazetted_detail", label: "Gazetted Detail" },
  { name: "survey_plan", label: "Survey Plan" },
  {
    name: "surface_condition",
    label: "Surface Condition",
    select: true,
    options: Object.values(SurfaceCondition),
  },
  {
    name: "pavement_type",
    label: "Pavement Type",
    select: true,
    options: Object.values(PavementType),
  },
  {
    name: "starting_point_latitude",
    label: "Starting Point Latitude",
    type: "number",
  },
  {
    name: "starting_point_longitude",
    label: "Starting Point Longitude",
    type: "number",
  },

  { name: "end_point_latitude", label: "End Point Latitude", type: "number" },
  {
    name: "end_point_longitude",
    label: "End Point Longitude",
    type: "number",
  },

  {
    name: "drainage_availability",
    label: "Drainage Availability",
    select: true,
    options: Object.values(DrainageAvailability),
  },
  { name: "starting_point_photo", label: "Starting Point Photo", photo: true },
  { name: "end_point_photo", label: "End Point Photo", photo: true },
  // You can add more fields as needed
];
