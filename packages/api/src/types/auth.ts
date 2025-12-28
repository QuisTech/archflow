export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}
