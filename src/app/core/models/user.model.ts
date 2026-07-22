// export interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   username: string;
//   phone: string;
//   image: string;
//   role?: string;
// }

export interface Hair {
  color: string;
  type: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email: string;
  username: string;
  phone: string;
  birthDate?: string;
  image: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: Hair;
  role?: string;
}



export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
