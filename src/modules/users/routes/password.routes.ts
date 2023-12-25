import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';


const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',            // localhost:3333/password/forgot
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
    }
  }),
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',            // localhost:3333/password/reset
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required().uuid(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }
  }),
  resetPasswordController.create,
);

export default passwordRouter;