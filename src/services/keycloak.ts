import { useKeycloak } from "@baloise/vue-keycloak";
import { KeycloakInstance } from "keycloak-js";
import { computed, ComputedRef, Ref } from 'vue';

export function keycloakObject(): IKeycloak {
    const {
        username,
        keycloak,
        hasRoles,
        isAuthenticated,
        hasFailed,
        isPending,
        roles        
    } = useKeycloak();
    
    const tempToken = computed(() => keycloak.token);
    const hasAccess = computed(() => hasRoles(["RoleName"]));
    const name = computed(() => username);
    const isAuth = computed(() => isAuthenticated)
    const kcInstance = keycloak
    
    return {
        hasAccess,
        name,
        tempToken,
        isAuth,
        kcInstance
    };
}

export interface IKeycloak {
    hasAccess: ComputedRef<boolean>,
    name: ComputedRef<Ref<string>>,
    tempToken: ComputedRef<string | undefined>
    isAuth: ComputedRef<Ref<boolean>>,
    kcInstance : KeycloakInstance
}