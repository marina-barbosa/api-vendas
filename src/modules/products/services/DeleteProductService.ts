import RedisCache from "@shared/cache/RedisCache";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";

interface InterfaceRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: InterfaceRequest): Promise<void> {
    const productsRepository = ProductRepository;

    const product = await productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);

  }
}

export default DeleteProductService;