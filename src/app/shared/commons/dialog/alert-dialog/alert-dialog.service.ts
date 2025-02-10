import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable} from "rxjs";
import {AlertDialogComponent} from "./alert-dialog.component";

type AlertDialogSetting = {
  title?: string,
  content?: string,
  isInnerHTML?: boolean,
  confirmButtonMsg?: string,
  size?: 'sm' | 'lg' | 'xl' | string
  type?: 'info' | 'warning' | 'danger'
};

@Injectable({providedIn: 'root'})
export class AlertDialogService {

  constructor(private modalService: NgbModal) {
  }

  open(setting?: AlertDialogSetting): Observable<boolean> {

    this.modalService.dismissAll();
    const modalRef = this.modalService.open(AlertDialogComponent, {backdrop: 'static', centered: true, size: setting.size});
    modalRef.componentInstance.title = setting.title || 'การแจ้งเตือน';
    modalRef.componentInstance.type = setting.type || 'info';
    modalRef.componentInstance.content = setting.content;
    modalRef.componentInstance.isInnerHTML = setting.isInnerHTML;
    return from(modalRef.result)
  }
}
