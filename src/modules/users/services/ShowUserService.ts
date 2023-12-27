import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface InterfaceRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: InterfaceRequest): Promise<User> {
    const usersRepository = UsersRepository;

    const user = await usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowUserService;