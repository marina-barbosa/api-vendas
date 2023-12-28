import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { hash } from "bcrypt";
import RedisCache from "@shared/cache/RedisCache";

interface InterfaceRequest {
  name: string;
  email: string;
  password: string;
};

class CreateUserService {
  public async execute({ name, email, password }: InterfaceRequest): Promise<User> {

    const usersRepository = UsersRepository;

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used');
    }
    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      // avatar: 'default_avatar.jpg'
    });

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-USER_LIST');

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;