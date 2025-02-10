import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {defer, Observable} from "rxjs";
import {ConfirmDialogComponent} from "./confirm-dialog.component";

type ConfirmDialogComponentSetting = {
  title?: string,
  content?: string,
  isInnerHTML?: boolean,
  confirmButtonMsg?: string,
};

@Injectable({providedIn: 'root'})
export class ConfirmDialogService {

  constructor(private modalService: NgbModal) {
  }

  open(setting?: ConfirmDialogComponentSetting): Observable<boolean> {

    const modalRef = this.modalService.open(ConfirmDialogComponent, {centered: true});
    if (setting) {
      modalRef.componentInstance.title = setting?.title || 'การแจ้งเตือน';
      modalRef.componentInstance.content = setting?.content;
      modalRef.componentInstance.isInnerHTML = setting?.isInnerHTML;
    }
    return defer(() => modalRef.result)
  }
}
