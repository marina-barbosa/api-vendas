import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface InterfaceRequest {
  email: string;
  password: string;
};

interface InterfaceResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: InterfaceRequest): Promise<InterfaceResponse> {

    const usersRepository = UsersRepository;

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, '0f7ccd5a0b24dcbf9f91c9f5d34a153c', { subject: user.id, expiresIn: '1d' });

    return { user, token };
  }
}

export default CreateSessionsService;