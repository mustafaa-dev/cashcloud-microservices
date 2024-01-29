import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';
import { NODE_ENV } from '@app/common';

@Catch()
export class GlobalErrorFilter extends BaseExceptionFilter {
  sendErrorDevelopment = async (err: any, res: any) => {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json(err);
  };

  sendErrorProduction = async (err: any, req: any, res: any) => {
    res.status(err.status).json({
      statusCode: err.status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: err.message,
    });
  };
  handleDuplicateError = async (exception: any) => {
    const status = HttpStatus.NOT_ACCEPTABLE;
    const message = exception.message.split('for')[0];
    return { message, status };
  };

  handleTypeError = async (exception: any) => {
    const status = HttpStatus.NOT_ACCEPTABLE;
    const message = exception.message;
    return { message, status };
  };

  handleHttpError = async (exception: any) => {
    const status = exception.getStatus();
    const message = exception.message;
    return { message, status };
  };

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let error = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };

    if (exception instanceof QueryFailedError)
      error = await this.handleDuplicateError(exception);

    if (exception instanceof HttpException)
      error = await this.handleHttpError(exception);

    if (exception instanceof TypeError)
      error = await this.handleTypeError(exception);

    if (NODE_ENV === 'dev')
      await this.sendErrorDevelopment(exception, response);
    else await this.sendErrorProduction(error, request, response);
  }
}
