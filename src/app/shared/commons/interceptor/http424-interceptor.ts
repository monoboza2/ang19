import {HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

export const IGNORE_424_ERROR = new HttpContextToken<boolean>(() => false);

@Injectable()
export class Http424Interceptor implements HttpInterceptor {

  constructor() {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    // return req.context.get(IGNORE_424_ERROR) ? next.handle(req) : next.handle(req)
    //   .pipe(tap
    //     (event => {
    //       },
    //       (err: HttpErrorResponse) => {
    //         if (err.status == 424) {
    //           this.warningDialogService.open({title: 'เกิดการละเมิดข้อกำหนดของข้อมูล', isJSON: true, json: err.error});
    //         }
    //       })
    //   );
  }


}
