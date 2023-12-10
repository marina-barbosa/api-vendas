import { Router } from 'express';
import { Response } from 'express';

const routes = Router();

routes.get('/hello', (_, response: Response) => {
  return response.json({ message: 'Hello World!' });
});

export default routes;
