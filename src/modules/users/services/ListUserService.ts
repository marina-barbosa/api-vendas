import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import RedisCache from "@shared/cache/RedisCache";

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = UsersRepository;

    const redisCache = new RedisCache();

    let users = await redisCache.recover<User[]>(
      'api-vendas-USER_LIST'
    )

    if (!users) {
      users = await usersRepository.find();

      await redisCache.save('api-vendas-USER_LIST', users);
    }

    return users;
  }
}

export default ListUserService;