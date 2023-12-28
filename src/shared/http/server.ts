import 'reflect-metadata'; //essa importação deve ser a primeira sempre
import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes/routes';
import AppError from '../errors/AppError';
import '@shared/typeorm/index';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';
import express from 'express';
import 'express-async-errors';
import AppAsyncError from '@shared/errors/AppAsyncError';
//import { pagination } from 'typeorm-pagination'


const server = express();

server.use(cors());
server.use(express.json());

server.use(rateLimiter);

//server.use(pagination);

server.use('/files', express.static(uploadConfig.directory));
server.use(routes);

// esse deve vir sempre depois das rotas
server.use(errors());
server.use(AppAsyncError);

const port = process.env.PORT || 3334;

const httpServer = server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

process.on('SIGINT', () => {
  httpServer.close();
  console.log('Server closed by the user.');
});
