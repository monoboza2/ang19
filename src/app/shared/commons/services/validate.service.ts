import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {ReplaySubject} from "rxjs";

export type ClientError = { forId?: string, field: string, message: string };

@Injectable({providedIn: "root"})
export class ValidateService {

  serverErrors = new ReplaySubject<{ context: any, response: HttpErrorResponse }>(1);
  clientErrors = new ReplaySubject<ClientError>(1);

  constructor() {
  }

  clientError(error: ClientError) {
    this.clientErrors.next(error);
  }

  clear() {
    this.serverErrors.next(undefined);
    this.clientErrors.next(undefined);
  }
}
