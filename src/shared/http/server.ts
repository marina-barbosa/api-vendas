import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import routes from './routes/routes';
import express, { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import '@shared/typeorm/index';

const server = express();

server.use(cors());
server.use(express.json());

server.use(routes);

server.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor.'
  });
});

const port = process.env.PORT || 3333;

const httpServer = server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

process.on('SIGINT', () => {
  httpServer.close();
  console.log('Server closed by the user.');
});
