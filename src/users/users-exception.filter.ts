import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

class CustomError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

@Catch()
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: CustomError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception.code === 'P2002') {
      return response.status(409).json({
        message: 'Email already exists',
        error: 'Conflict',
        statusCode: 409,
      });
    }

    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    return response.status(500).json({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
