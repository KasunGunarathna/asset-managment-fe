export interface UserCredentials {
  nic: string;
  password: string;
}

export interface FormField {
  name: string;
  label: string;
  type?: string;
  select?: boolean;
  photo?: boolean;
  password?: boolean;
  setShowPassword?: boolean;
  options?: string[];
}
export interface AuthData {
  access_token: string;
  expires_in: string;
}

export interface UserInsert extends User {
  id: number;
}
export interface User {
  name: string | undefined;
  user_type: string | undefined;
  nic: string | undefined;
  password: string | undefined;
}

export interface Bridge {
  bridge_name: string | undefined;
  road_name: string | undefined;
  location: string | undefined;
  length: number | undefined;
  width: number | undefined;
  structure_condition: string | undefined;
  road_surface_condition: string | undefined;
  remarks: string | undefined;
}

export interface Road {
  road_name: string | undefined;
  length: number | undefined;
  width: number | undefined;
  gazetted_detail: string | undefined;
  survey_plan: string | undefined;
  surface_condition: string | undefined;
  pavement_type: string | undefined;
  starting_point_location: string | undefined;
  starting_point_photo: string | undefined;
  end_point_location: string | undefined;
  end_point_photo: string | undefined;
  drainage_availability: string | undefined;
  startingPhotoUrl?: string | undefined;
  endPhotoUrl?: string | undefined;
}

export interface StreetLight {
  pole_number: string | undefined;
  road_name: string | undefined;
  wire_condition: string | undefined;
  switch_condition: string | undefined;
  pole_type: string | undefined;
  lamp_type: string | undefined;
  photo?: string | undefined;
  photoUrl?: string | undefined;
}

export interface Drainage {
  road_name: string;
  drainage_type: string;
  side_of_drain: string;
  starting_point_location: string;
  end_point_location: string;
  condition: string;
  length: number;
  width: number;
}

export interface Building {
  name: string;
  plan: string;
  number_of_stories: number;
  photo?: string;
  location: string;
  built_year: number;
  condition: string;
  remark: string;
  photoUrl?: string | undefined;
}


export interface Vehicle {
  vehicle_number: string | undefined;
  vehicle_make: string | undefined;
  model: string | undefined;
  fuel_type: string | undefined;
  license_from: string | undefined;
  license_to: string | undefined;
  engine_number: string | undefined;
  allocated_location: string | undefined;
  yom: string | undefined; // Year of Manufacture
  yor: string | undefined; // Year of Registration
  chassi_number: string | undefined;
  taxation_class: string | undefined;
  wheel_size: string | undefined;
  battery_required: string | undefined;
  fuel_consume: string | undefined;
  date_of_tested: string | undefined;
}

