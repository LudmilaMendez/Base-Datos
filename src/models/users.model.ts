import pool from '../database/mysql';

// Representa un producto tal como vive en la base de datos
export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
}

// Datos necesarios para crear un producto
export interface CreateProductDTO {
    name: string;
    price: number;
    quantity: number;
    category_id: number;
}

export const getAllProducts = async (): Promise<Product[]> => {
    const [rows] = await pool.query<Product[]>(`
    SELECT p.id, p.name, p.price, p.quantity, c.name AS category
    FROM products p
    JOIN categories c ON p.category_id = c.id
`);

    return rows;
};

export const createProduct = async (data: CreateProductDTO): Promise<void> => {
    const { name, price, quantity, category_id } = data;

    await pool.query(
        'INSERT INTO products (name, price, quantity, category_id) VALUES (?, ?, ?, ?)',
        [name, price, quantity, category_id]
    );
};