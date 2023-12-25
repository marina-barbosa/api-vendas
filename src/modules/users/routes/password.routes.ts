import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';


const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',            // localhost:3333/password/forgot
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
    }
  }),
  forgotPasswordController.create,
);

export default passwordRouter;