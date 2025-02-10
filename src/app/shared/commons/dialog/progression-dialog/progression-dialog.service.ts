import {Injectable} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable} from "rxjs";
import {ProgressionDialogComponent} from "./progression-dialog.component";

type AlertDialogSetting = {
  title?: string,
  content?: string,
  isInnerHTML?: boolean,
  confirmButtonMsg?: string,
  size?: 'sm' | 'lg' | 'xl' | string
  type?: 'info' | 'warning' | 'danger'
};

@Injectable({providedIn: 'root'})
export class ProgressionDialogService {
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {
  }

  open(setting?: AlertDialogSetting): Observable<boolean> {
    this.modalService.dismissAll();
    this.modalRef = this.modalService.open(ProgressionDialogComponent, {
      backdrop: 'static',
      centered: true,
      size: setting.size
    });
    this.modalRef.componentInstance.title = setting.title || 'การแจ้งเตือน';
    this.modalRef.componentInstance.type = setting.type || 'info';
    this.modalRef.componentInstance.content = setting.content;
    this.modalRef.componentInstance.isInnerHTML = setting.isInnerHTML;
    return from(this.modalRef.result)
  }

  close() {
    this.modalRef?.close();
  }
}
