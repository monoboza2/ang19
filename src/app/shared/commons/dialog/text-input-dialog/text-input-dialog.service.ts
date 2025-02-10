import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable} from "rxjs";
import {TextInputDialogComponent} from "./text-input-dialog.component";

type TextInputDialogComponentSetting = {
  title?: string,
  content?: string,
  isInnerHTML?: boolean
};

@Injectable({providedIn: 'root'})
export class TextInputDialogService {

  constructor(private modalService: NgbModal) {
  }

  open(setting?: TextInputDialogComponentSetting): Observable<any> {

    const modalRef = this.modalService.open(TextInputDialogComponent, {centered: true, size: "lg"});
    if (setting) {
      modalRef.componentInstance.title = setting?.title || 'การแจ้งเตือน';
      modalRef.componentInstance.content = setting?.content;
      modalRef.componentInstance.isInnerHTML = setting?.isInnerHTML;
    }
    return from(modalRef.componentInstance.saveEmit);
  }
}
