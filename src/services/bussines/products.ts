import { Guid } from 'guid-typescript';
import { get, post } from '../axios';

export function saveProduct(command: IProduct): Promise<void> {
    return post('/GetAllProducts', command);
}

export function GetAllProducts(): Promise<IProduct[]> {
    return get<IProduct[]>('/Products/GetAllProducts');
}

export function GetProduct(productId: Guid): Promise<IProduct> {
    return get<IProduct>('/Products/GetProduct', { productId });
}

interface IProduct {
    name: string,
    description: string,
    pic: File
}