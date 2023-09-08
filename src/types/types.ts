export interface UserCredentials {
  nic: string;
  password: string;
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