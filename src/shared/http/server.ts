import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes/routes';
import express, { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import '@shared/typeorm/index';
import uploadConfig from '@config/upload';


const server = express();

server.use(cors());
server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));
server.use(routes);

server.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    console.log('App' + error);
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log('(AppError 500) ' + error);
  return response.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor!!'
  });
});

const port = process.env.PORT || 3334;

const httpServer = server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

process.on('SIGINT', () => {
  httpServer.close();
  console.log('Server closed by the user.');
});
