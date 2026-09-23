export interface LoginCredentials {
  email: string;
  password: string;
}
export interface Role {
  id: number;
  name: string;
  slug: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  userName: string;
  profileImage: string | null;
  isActive: boolean;
  isVerified: boolean;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  tokenType: string;
}

export interface ProfileResponse {
  token: any;
  id: number;
  name: string;
  email: string;
  role: string;
  data: any;
  result: any;
}

export interface User {
  id: number;
  name: string;
  email: string;
  userName: string;
  profileImage: string | null;
  isActive: boolean;
  isVerified: boolean;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

export interface PaginationMeta {
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
