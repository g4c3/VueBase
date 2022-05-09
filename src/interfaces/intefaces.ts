import { Role } from '../roles/roles';
import { KeycloakConfig } from 'keycloak-js'

export interface IAuthorization {    
    isAuthenticated: boolean,
    user: IUser
}

export interface IUser {
    emailAddress: string | null | undefined;
    name: string | null;
    token: string | null | undefined;
    loginRoles: Role[] | null;    
}
export interface IAppControl{
    theme: string | null
}

export interface IRootState {
    authorization: IAuthorization,

}

export interface KeycloakProjectConfigs extends KeycloakConfig {
    'public-client': boolean,
    'verify-token-audience': boolean
}

export interface VueHorizontalData {
    left: number;
    width: number;

    scrollWidth: number;
    scrollCompleted: boolean;
    hasPrev: boolean;
    hasNext: boolean;
    firstVisibleEl: number;
}