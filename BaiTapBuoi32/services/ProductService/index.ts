import { ProductServiceI } from "./type";
import { Product } from "../../models/Product";
import { UpdateProductDataI } from "./type";

export class ProductService implements ProductServiceI {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    updateProduct(id: string, data: UpdateProductDataI): void {
        const product = this.products.find((p) => p.getId() === id);
        if (product) {
            product.setName(data.name);
            product.setPrice(data.price);
            product.setStock(data.stock);
        } else {
            throw new Error("Product not found");
        }
    }

    deleteProduct(id: string): void {
        const productIndex = this.products.findIndex((p) => p.getId() === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
        }
    }

    findById(id: string): Product | undefined {
        return this.products.find((p) => p.getId() === id);
    }

    findByName(keyword: string): Product[] {
        const search = keyword.trim().toLowerCase();
        return this.products.filter((p) =>
            p.getName().toLowerCase().includes(search),
        );
    }

    getAllProducts(): Product[] {
        return this.products;
    }

    printProducts(): void {
        this.products.forEach((p) => console.log(p.toString()));
    }
}
