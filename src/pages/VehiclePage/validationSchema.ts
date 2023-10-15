import * as yup from "yup";
import { FuelType, TaxationClass } from "../../types/enum";

export const validationSchema = yup.object({
  vehicle_number: yup.string().required("Vehicle Number is required"),
  vehicle_make: yup.string().required("Vehicle Make is required"),
  model: yup.string().required("Model is required"),
  fuel_type: yup
    .string()
    .required("Fuel Type is required")
    .oneOf(Object.values(FuelType), "Invalid Fuel Type"),
  license_from: yup.date().required("License From Date is required"),
  license_to: yup.date().required("License To Date is required"),
  engine_number: yup.string().required("Engine Number is required"),
  allocated_location: yup.string().required("Allocated Location is required"),
  yom: yup
    .number()
    .required("Year of Manufacture is required")
    .integer("Year of Manufacture must be an integer")
    .positive("Year of Manufacture must be a positive number"),
  yor: yup
    .number()
    .required("Year of Registration is required")
    .integer("Year of Registration must be an integer")
    .positive("Year of Registration must be a positive number"),
  chassi_number: yup.string().required("Chassis Number is required"),
  taxation_class: yup
    .string()
    .required("Taxation Class is required")
    .oneOf(Object.values(TaxationClass), "Invalid Taxation Class"),
  wheel_size: yup.string().required("Wheel Size is required"),
  battery_required: yup.string().required("Battery Required is required"),
  fuel_consume: yup.number().required("Fuel Consumption is required"),
  date_of_tested: yup.date().required("Date of Tested is required"),
});
