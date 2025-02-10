import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable} from "rxjs";
import {EmailNotifyDialogComponent} from "./email-notify-dialog.component";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class EmailNotifyDialogService {

  constructor(private modalService: NgbModal, private http: HttpClient) {
  }

  open(): Observable<boolean> {
    const modalRef = this.modalService.open(EmailNotifyDialogComponent, {
      centered: true,
      size: 'xl',
      keyboard: false,
    });
    return from(modalRef.result)
  }

  checkEmail(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.serverUrl}/api/zone-email/check-email`, {observe: "body"});
  }
  updateCurrentUser(checkEmail : boolean): Observable<void> {
    return this.http.put<void>(`${environment.serverUrl}/api/zone-email/update-current-user/${checkEmail}`, {checkEmail : checkEmail});
  }

}
