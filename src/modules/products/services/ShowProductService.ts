import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface InterfaceRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: InterfaceRequest): Promise<Product> {
    const productsRepository = ProductRepository;

    const product = await productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;