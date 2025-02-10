import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class HttpGetUuidInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('req = ', req.url);
    // console.log('window.location.href.replace("/#/", "/") = ', window.location.href.replace("/#/", "/"));
    // const requestUrl = new URL(req.url)
    // const routeUrl = new URL(window.location.href.replace("/#/", "/"))
    // // console.log('routeUrl = ', routeUrl);
    // let uuid = routeUrl.searchParams.get("uuid")
    // if (req.method === 'GET' && uuid && requestUrl.pathname.startsWith("/api/")) {
    //   const httpRequest = req.clone({params: req.params.append('uuid', uuid)});
    //   return next.handle(httpRequest);
    // } else {
    //   return next.handle(req);
    // }
    return next.handle(req);
  }

}
