import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { hash } from "bcrypt";

interface InterfaceRequest {
  id: string;
  name: string;
  email: string;
  password: string;
};

class UpdateUserService {
  public async execute({ id, name, email, password }: InterfaceRequest): Promise<User> {
    const usersRepository = UsersRepository;

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used');
    }
    const hashedPassword = await hash(password, 8);

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-USER_LIST');

    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;