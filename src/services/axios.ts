import axios, { AxiosResponse, AxiosError } from 'axios';

const axiosApiInstance = axios.create()
// axiosApiInstance.interceptors.request.use(
//     async config => {
//       const token = getToken()
//       if(token) {
//         config.headers = {
//             Authorization: `Bearer ${token}`,
//         }
//       }
//       return config
//     },
//     error => {
//       Promise.reject(error)
//     },
// )

export async function get<T>(url: string, params?: any): Promise<T> {
    try {
        let response = await axiosApiInstance.get(url, { params });
        return response.data;
    }
    catch (error) {
        throw error;
    }    
}

export async function post(url: string, data?: any, params?: any, headers?: any): Promise<void> {
    try {
        await axiosApiInstance.post(url, data, { params, headers });
    }
    catch (error) {
        throw error;
    }
}

// function getToken(): string {
//     return this.$keycloak.token;
// }