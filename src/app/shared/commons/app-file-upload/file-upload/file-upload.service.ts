import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {environment} from "../../../../../environments/environment";

export const UPLOAD_URL=`${environment.serverUrl}/api/file-upload`
@Injectable()
export class FileUploadService {

  constructor(private _http: HttpClient) {
  }

  delete(file: any): Observable<void> {

    if (!!file) {
      return this._http.post<void>(`${UPLOAD_URL}/delete`, file);
    }
    return of();
  }

}
