import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { table, getBorderCharacters } from 'table';
import { green, blue, yellow, magenta, cyan, bold } from 'colorette';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (context.getType() !== 'rpc') {
            return next.handle();
        }

        const startTime = Date.now();
        const request = context.switchToRpc().getData();
        const metadata = context.switchToRpc().getContext();
        const call = context.getArgByIndex(2);

        let clientIp = 'Unknown IP';
        if (call && typeof call.getPeer === 'function') {
            clientIp = call.getPeer();
        }

        const methodName = context.getHandler().name;

        return next.handle().pipe(
            tap(() => {
                const endTime = Date.now();
                const responseTime = endTime - startTime;

                const logData = [
                    [bold(cyan('Field')), bold(cyan('Value'))],
                    [blue('Method'), green(methodName)],
                    [blue('Client IP'), yellow(clientIp)],
                    [blue('Metadata'), magenta(JSON.stringify(metadata.getMap(), null, 2))],
                    [blue('Request Data'), JSON.stringify(request)],
                    [blue('Response Time'), magenta(`${responseTime} ms`)],
                ];

                console.log(
                    table(logData, {
                        border: getBorderCharacters('norc'),
                        columns: {
                            0: { width: 15, alignment: 'left' },
                            1: { width: 60, alignment: 'left' },
                        },
                    })
                );
            }),
        );
    }
}
