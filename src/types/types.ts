export interface UserCredentials {
  nic: string;
  password: string;
}

export interface AuthData {
  access_token: string;
  expires_in: string;
}

export interface User {
  name: string | undefined;
  user_type: string| undefined;
  nic: string| undefined;
  password: string| undefined;
}

export interface UserInsert extends User {
  id: number;
}
