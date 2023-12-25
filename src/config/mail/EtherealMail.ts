import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface InterfaceMailContact {
  name: string;
  email: string;
}

interface InterfaceTemplateVariable {
  [key: string]: string | number;
}

interface InterfaceParseMailTemplate {
  template: string;
  variables: InterfaceTemplateVariable;
}

interface InterfaceSendMail {
  from?: InterfaceMailContact;
  to: InterfaceMailContact;
  subject: string;
  templateData: InterfaceParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: InterfaceSendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipe@apivenda.com.br'
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }


}