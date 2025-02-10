import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable} from "rxjs";
import {TypeChangesDialogComponent} from "./type-changes-dialog.component";

type ConfirmDialogComponentSetting = {
  title?: string,
  content?: string,
  isInnerHTML?: boolean,
};

@Injectable({providedIn: 'root'})
export class TypeChangesDialogService {

  constructor(private modalService: NgbModal) {
  }

  open(setting?: ConfirmDialogComponentSetting): Observable<boolean> {

    const modalRef = this.modalService.open(TypeChangesDialogComponent, {centered: true, size: 'lg'});
    if (setting) {
      modalRef.componentInstance.title = setting?.title || 'การแจ้งเตือน';
      modalRef.componentInstance.content = setting?.content;
      modalRef.componentInstance.isInnerHTML = setting?.isInnerHTML;
    }
    return from(modalRef.result)
  }
}
