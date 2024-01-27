import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.error('An error occurred:', error);

        return throwError(
          new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: 'Internal Server Error',
              message: error.message || 'Unexpected error occurred',
            },
            HttpStatus.OK,
          ),
        );
      }),
    );
  }
}
