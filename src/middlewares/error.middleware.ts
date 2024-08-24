import { ServiceResponseError } from '@/models/service-reponse/service-response';
import { NextFunction, Request, Response } from 'express';

export default function errorMiddleware(
  error: ServiceResponseError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.code || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).json(error);
}
