import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable} from "rxjs";
import {WarningDialogComponent} from "./warning-dialog.component";

type WarningDialogSetting = {
  title?: string,
  content?: string,
  isInnerHTML?: boolean,
  isJSON?: boolean,
  json?: any,
};

@Injectable({providedIn: 'root'})
export class WarningDialogService {

  constructor(private modalService: NgbModal) {
  }

  open(setting?: WarningDialogSetting): Observable<boolean> {

    const modalRef = this.modalService.open(WarningDialogComponent, {centered: true, size: 'lg'});
    modalRef.componentInstance.title = setting?.title || 'การแจ้งเตือน';
    modalRef.componentInstance.content = setting?.content;
    modalRef.componentInstance.isInnerHTML = setting?.isInnerHTML;
    modalRef.componentInstance.isJSON = setting?.isJSON;
    modalRef.componentInstance.json = setting?.json;
    return from(modalRef.result)
  }
}
