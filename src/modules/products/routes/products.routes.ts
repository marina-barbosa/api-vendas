import { Router } from 'express';
import ProductsController from '../controller/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();
productsRouter.use(isAuthenticated);

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  productsController.show
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required().precision(2),
      quantity: Joi.number().required(),
    }
  }),
  productsController.create
);

productsRouter.put('/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required().precision(2),
      quantity: Joi.number().required(),
    }
  }),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  productsController.update
);

productsRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  productsController.delete
);

export default productsRouter;