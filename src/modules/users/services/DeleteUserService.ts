import RedisCache from "@shared/cache/RedisCache";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";

interface InterfaceRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: InterfaceRequest): Promise<void> {
    const usersRepository = UsersRepository;

    const user = await usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-USER_LIST');

    await usersRepository.remove(user);

  }
}

export default DeleteUserService;