import { Request, Response } from 'express';
import * as productService from '../services/auth.service';
import { CreateProductDTO } from '../models/users.model';

export const showDashboard = async (req: Request, res: Response) => {
    const products = await productService.listProducts();
    res.render('products', { products });
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, quantity, category_id } = req.body;

    const newProduct: CreateProductDTO = {
        name,
        price: Number(price),
        quantity: Number(quantity),
        category_id: Number(category_id),
    };

    await productService.addProduct(newProduct);
    res
        .status(201)
        .json({ success: true, message: 'Producto creado correctamente' });
};