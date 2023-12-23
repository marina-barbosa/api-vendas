import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface InterfaceRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: InterfaceRequest): Promise<Product> {
    const productsRepository = ProductRepository;

    const product = await productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    const productsExist = await productsRepository.findByName(name);

    if (productsExist) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;