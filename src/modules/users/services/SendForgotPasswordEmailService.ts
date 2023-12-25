import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../typeorm/repositories/UsersTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";

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

    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida:
      ID do usuário: ${token?.user_id || 'Valor não disponível'}
      ID do token: ${token?.id || 'Valor não disponível'}
      Token: ${token?.token || 'Valor não disponível'}
      Criado em: ${token?.created_at || 'Valor não disponível'}
      Atualizado em: ${token?.updated_at || 'Valor não disponível'}
      `,
    })

  }
}

export default SendForgotPasswordEmailService;