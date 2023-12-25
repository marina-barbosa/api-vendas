import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface InterfaceRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: InterfaceRequest): Promise<User> {
    const usersRepository = UsersRepository;

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found');
    }

    return user;
  }
}

export default ShowProfileService;