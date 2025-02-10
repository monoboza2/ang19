import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ValidateService} from "../services/validate.service";
import {ToastService} from "../toast/toast-service";
import {VALIDATE_CONTEXT} from "../gt-error/gt-error.component";

export const IGNORE_400_ERROR = new HttpContextToken<boolean>(() => false);

@Injectable()
export class Http400Interceptor implements HttpInterceptor {

    constructor(private validatorService: ValidateService, private toastService: ToastService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return req.context.get(IGNORE_400_ERROR) ? next.handle(req) : next.handle(req)
            .pipe(tap
                (event => {
                    if (!req.url.includes("actuator/info")) {
                        this.validatorService.clear()
                    }
                }, (err: HttpErrorResponse) => {
                    if (err.status == 400) {
                        this.toastService.showWarning("ข้อมูลไม่ครบถ้วน โปรดตรวจสอบความถูกต้อง");
                        if (err.error instanceof Blob) {
                            const reader = new FileReader();
                            reader.onload = e => {
                                const jsonError = {...err, error: JSON.parse((<any>e.target).result)};
                                this.validatorService.serverErrors.next({
                                    context: req.context.get(VALIDATE_CONTEXT),
                                    response: jsonError
                                })
                            };
                            reader.readAsText(err.error, 'utf-8');

                        } else {
                            this.validatorService.serverErrors.next({
                                context: req.context.get(VALIDATE_CONTEXT),
                                response: err
                            })
                        }
                    }
                })
            );
    }


}
