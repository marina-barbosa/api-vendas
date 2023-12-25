import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../typeorm/repositories/UsersTokenRepository";

interface InterfaceRequest {
  email: string;
};

class SendForgotPasswordEmailService {
  public async execute({ email }: InterfaceRequest): Promise<void> {

    const usersRepository = UsersRepository;

    const usersTokensRepository = UsersTokensRepository;

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = await usersTokensRepository.generate(user.id);

    console.log(token);

  }
}

export default SendForgotPasswordEmailService;