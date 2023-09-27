import { LampType, PoleType } from "../../types/enum";
import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "pole_number", label: "Pole Number" },
  { name: "road_name", label: "Road Name" },
  { name: "wire_condition", label: "Wire Condition" },
  { name: "switch_condition", label: "Switch Condition" },
  {
    name: "pole_type",
    label: "Pole Type",
    select: true,
    options: Object.values(PoleType),
  },
  {
    name: "lamp_type",
    label: "Lamp Type",
    select: true,
    options: Object.values(LampType),
  },
  { name: "photo", label: "Photo", photo: true },
];
