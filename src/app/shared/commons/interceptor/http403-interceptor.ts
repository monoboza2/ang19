import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export const IGNORE_403_ERROR = new HttpContextToken<boolean>(() => false);

@Injectable()
export class Http403Interceptor implements HttpInterceptor {

    private currentUrl: string;

    constructor(private modalService: NgbModal,
                private router: Router) {

        this.router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                this.currentUrl = e.url;
            }
        })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.context.get(IGNORE_403_ERROR)) {
            return next.handle(req)
        }
        return next.handle(req)
            .pipe(tap
                (event => {
                }, (err: HttpErrorResponse) => {
                    if (err.status == 403) {
                        this.router.navigate(['/403']);
                    }
                })
            );
    }

}
