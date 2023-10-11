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
    name: "drainage_availability",
    label: "Drainage Availability",
    select: true,
    options: Object.values(DrainageAvailability),
  },
  {
    name: "starting_point_location",
    label: "Starting Point Latitude, Longitude",
  },

  { name: "end_point_location", label: "End Point Latitude, Longitude" },
  { name: "starting_point_photo", label: "Starting Point Photo", photo: true },
  { name: "end_point_photo", label: "End Point Photo", photo: true },
];
