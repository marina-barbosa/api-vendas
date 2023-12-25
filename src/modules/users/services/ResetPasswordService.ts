import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../typeorm/repositories/UsersTokenRepository";
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcrypt';

interface InterfaceRequest {
  token: string;
  password: string;
};

class ResetPasswordService {
  public async execute({ token, password }: InterfaceRequest): Promise<void> {

    const usersRepository = UsersRepository;

    const usersTokensRepository = UsersTokensRepository;

    const userToken = await usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);

  }
}

export default ResetPasswordService;