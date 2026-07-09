import { ProductI } from "../../models/Product/type";

export interface UpdateProductDataI {
    name: string;
    price: number;
    stock: number;
}

export interface ProductServiceI {
    addProduct(product: ProductI): void;

    updateProduct(id: string, data: UpdateProductDataI): void;

    deleteProduct(id: string): void;

    findById(id: string): ProductI | undefined;

    findByName(keyword: string): ProductI[];

    getAllProducts(): ProductI[];

    printProducts(): void;
}
