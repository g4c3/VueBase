import { Role } from '../roles/roles';

export interface IAuthorization {    
    isAuthenticated: boolean,
    user: IUser}

export interface IUser {
    emailAddress: string | null | undefined;
    name: string | null;
    token: string | null;
    loginRoles: Role[] | null;    
}

export interface IRootState {}