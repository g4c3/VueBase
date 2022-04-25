import axios, { AxiosResponse, AxiosError } from 'axios';

const axiosApiInstance = axios.create()

export async function get<T>(url: string, params?: any): Promise<T> {
    try {
        const response = await axiosApiInstance.get(url, { params });
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