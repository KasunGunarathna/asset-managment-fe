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
  numberOfStories: number;
  photo: string; // You can use a URL or a file path here
  location: string;
  builtYear: number;
  condition: string;
  remark: string;
}