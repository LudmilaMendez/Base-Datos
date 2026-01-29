import * as productModel from '../models/users.model';
import { CreateProductDTO, Product } from '../models/users.model';

export const listProducts = async (): Promise<Product[]> => {
    return productModel.getAllProducts();
};

export const addProduct = async (data: CreateProductDTO): Promise<void> => {
    await productModel.createProduct(data);
};