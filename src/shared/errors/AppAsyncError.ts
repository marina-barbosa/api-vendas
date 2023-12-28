import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';


export default function AppAsyncError(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    console.log('AppAsyncError' + JSON.stringify(err));
    return res.status(err.statusCode).json({
      status: 'AppAsyncError',
      message: err.message
    });
  }

  console.error(err.stack);
  return res.status(500).json({
    status: 'AppAsyncError',
    message: 'Internal Server Error'
  });
}