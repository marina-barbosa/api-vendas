import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = UsersRepository;

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;