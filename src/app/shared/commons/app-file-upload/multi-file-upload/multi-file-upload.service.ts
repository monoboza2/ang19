import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {FileUpload} from "../../../../../generated-model/model";
import {environment} from "../../../../../environments/environment";


@Injectable()
export class MultiFileUploadService {

    constructor(private _http: HttpClient) {
    }

    delete(file: FileUpload | any): Observable<void> {

        if (!!file) {
            return this._http.post<void>(`${environment.serverUrl}/api/file-upload/delete`, file);
        }
        return of();
    }

}
