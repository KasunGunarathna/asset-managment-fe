export interface UserCredentials {
    nic: string;
    password: string;
  }


  export interface User {
    name: string;
    user_type: string;
    nic: string;
    password: string;
  }

  export interface UserInsert extends User {
    id: number;
  }