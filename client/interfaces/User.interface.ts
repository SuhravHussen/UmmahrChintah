import { UserProfile } from "@auth0/nextjs-auth0/client";
import { PaginationInfo } from "./Common.interface";
import { PaginationLinks } from "./Common.interface";

export interface IUser extends UserProfile {
  "/roles": string[];
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sid: string;
  sub: string;
  updated_at: string;
}

export interface IDetailedUser {
  created_at: string; // ISO date string
  email: string;
  email_verified: boolean;
  identities: Array<{
    connection: string;
    user_id: string;
    provider?: string;
    isSocial?: boolean;
  }>;
  last_ip: string;
  last_login: string; // ISO date string
  logins_count: number;
  name: string;
  nickname: string;
  picture: string;
  roles: Array<UserRole>;
  updated_at: string; // ISO date string
  user_id: string;
}

export interface getAllUsersResponse {
  data: IDetailedUser[];
  pagination: PaginationInfo;
  _links: PaginationLinks;
}

export interface UserRole {
  id: string;
  name: string;
  description?: string;
}
