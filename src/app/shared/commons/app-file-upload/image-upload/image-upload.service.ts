import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {environment} from "../../../../../environments/environment";

export const IMAGE_UPLOAD_URL = 'api/file-upload/image';

@Injectable()
export class ImageUploadService {

  constructor(private _http: HttpClient) {
  }

  delete(file: any): Observable<void> {

    if (!!file) {
      return this._http.post<void>(`${environment.serverUrl}/api/file-upload/delete`, file);
    }
    return of();
  }

}
