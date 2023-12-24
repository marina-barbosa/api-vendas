import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

export default class UsersController {

  public async update(request: Request, response: Response): Promise<Response> {

    if (!request.file) {
      throw new AppError("File was not sent");
    }

    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    return response.json(user);
  }
}