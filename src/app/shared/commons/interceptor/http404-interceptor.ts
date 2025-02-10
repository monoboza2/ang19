import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AlertDialogService} from "../dialog/alert-dialog/alert-dialog.service";
import {tap} from "rxjs/operators";

export const IGNORE_404_ERROR = new HttpContextToken<boolean>(() => false);

@Injectable()
export class Http404Interceptor implements HttpInterceptor {

  constructor(private alertDialogService: AlertDialogService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return req.context.get(IGNORE_404_ERROR) ? next.handle(req) : next.handle(req)
      .pipe(
        tap(event => {

        }, (err: HttpErrorResponse) => {
          if (err.status == 404) {
            if(err?.error instanceof Blob) {
              const reader = new FileReader();
              reader.onload = e => {
                const jsonError = {...err, error: JSON.parse((<any>e.target).result)};
                this.alertDialogService.open({content: jsonError?.error?.message === 'No message available' ? `ไม่พบข้อมูล (Resource Not Found 404)` : jsonError?.error?.message || '404 Not found.'});
              };
              reader.readAsText(err.error, 'utf-8');
            }
            this.alertDialogService.open({content: err?.error?.message === 'No message available' ? `ไม่พบข้อมูล (Resource Not Found 404)` : err?.error?.message || '404 Not found.'});
          }
        })
      );
  }


}
