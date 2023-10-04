import { FuelType, TaxationClass } from "../../types/enum"; // Import relevant enums
import { FormField } from "../../types/types";

export const fields: FormField[] = [
  { name: "vehicle_number", label: "Vehicle Number" },
  { name: "vehicle_make", label: "Vehicle Make" },
  { name: "model", label: "Model" },
  { name: "fuel_type", label: "Fuel Type", select: true, options: Object.values(FuelType) },
  { name: "license_from", label: "License From", type: "date" },
  { name: "license_to", label: "License To", type: "date" },
  { name: "engine_no", label: "Engine No." },
  { name: "allocated_location", label: "Allocated Location" },
  { name: "yom", label: "Year of Manufacture" },
  { name: "yor", label: "Year of Registration" },
  { name: "chassi_no", label: "Chassis No." },
  { name: "taxation_class", label: "Taxation Class", select: true, options: Object.values(TaxationClass) },
  { name: "wheel_size", label: "Wheel Size" },
  { name: "battery_required", label: "Battery Required" },
  { name: "fuel_consume", label: "Fuel Consumption" },
  { name: "date_of_tested", label: "Date of Tested", type: "date" }
];
