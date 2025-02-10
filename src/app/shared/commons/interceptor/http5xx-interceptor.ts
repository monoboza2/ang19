import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ToastService} from "../toast/toast-service";
import {DangerDialogService} from "../dialog/danger-dialog/danger-dialog.service";

export const IGNORE_5XX_ERROR = new HttpContextToken<boolean>(() => false);

@Injectable()
export class Http5xxInterceptor implements HttpInterceptor {

  private toastService: ToastService;
  private dangerDialogService: DangerDialogService = inject(DangerDialogService);

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.context.get(IGNORE_5XX_ERROR)) {
      return next.handle(req)
    }
    return next.handle(req)
      .pipe(tap
      (event => {
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // this.toastService.showDanger();
          this.dangerDialogService.open();
        } else if (err.status >= 500 && err.status <= 505) {
          // this.toastService.showDanger();
          this.dangerDialogService.open();
        } else if (err.status == 0) {
          // this.toastService.showDanger();
          this.dangerDialogService.open();
        }
      }));
  }

}
