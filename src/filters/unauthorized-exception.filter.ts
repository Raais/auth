import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();

    const url = request.body.url as string;
    const redirect_url =
      url && url.startsWith('http') ? `&redirect_url=${url}` : '';

    const to = `/login/authorize${
      exception.message === 'invalid_token'
        ? '?from=auth_null'
        : '?from=invalid_credentials'
    }${redirect_url}`;

    response.status(200).clearCookie('token', {
      path: '/',
    });
    response.redirect(302, to);
  }
}
