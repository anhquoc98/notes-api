import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // Nếu response đã có format sẵn (như { message: '...' }), giữ nguyên
        if (data && typeof data === 'object' && 'message' in data) {
          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            ...data,
          } as Response<T>;
        }

        // Format response thống nhất
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: 'Thành công',
          data,
        };
      }),
    );
  }
}

