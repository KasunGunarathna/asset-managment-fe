export interface UserCredentials {
  nic: string;
  password: string;
}

export interface FormField {
  name: string;
  label: string;
  type?: string;
  select?: boolean;
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
  user_type: string| undefined;
  nic: string| undefined;
  password: string| undefined;
}

export interface Bridge {
  bridge_name: string | undefined;
  road_name: string| undefined;
  latitude: number| undefined;
  longitude: number| undefined;
  length: number | undefined;
  width: number| undefined;
  structure_condition: string| undefined;
  road_surface_condition: string| undefined;
  remarks: string| undefined;
}

export interface Road {
  road_name: string | undefined;
  length: number | undefined;
  width: number | undefined;
  gazetted_detail: string | undefined;
  survey_plan: string | undefined;
  surface_condition: string | undefined;
  pavement_type: string | undefined;
  starting_point_latitude: number | undefined;
  starting_point_longitude: number | undefined;
  starting_point_photo: string | undefined;
  end_point_latitude: number | undefined;
  end_point_longitude: number | undefined;
  end_point_photo: string | undefined;
  drainage_availability: string | undefined;
}
