import { Request } from 'express';

export interface UserData {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  sub?: string;
  refreshToken?: string;
}

export interface RequestWithUser extends Request {
  user: UserData;
}

export interface RequestWithGoogleUser extends Request {
  user: {
    accessToken: string;
    refreshToken: string;
    user: UserData;
  };
}

export interface RequestWithRefreshToken extends Request {
  user: UserData & { refreshToken: string };
}
