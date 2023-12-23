import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

interface InterfaceRequest {
  name: string;
  price: number;
  quantity: number;
};

class CreateProductService {
  public async execute({ name, price, quantity }: InterfaceRequest): Promise<Product> {

    const productsRepository = ProductRepository;

    const productsExist = await productsRepository.findByName(name);

    if (productsExist) {
      throw new AppError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;