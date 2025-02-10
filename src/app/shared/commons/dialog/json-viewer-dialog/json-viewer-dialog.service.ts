import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable} from "rxjs";
import {JsonViewerDialogComponent} from "./json-viewer-dialog.component";

type JsonViewerDialogSetting = {
  title?: string,
  content?: string,
  isInnerHTML?: boolean,
  isJson?: boolean,
  confirmButtonMsg?: string,
  size?: 'sm' | 'lg' | 'xl' | string
  type?: 'info' | 'warning' | 'danger'
};

@Injectable({providedIn: 'root'})
export class JsonViewerDialogService {

  constructor(private modalService: NgbModal) {
  }

  open(setting?: JsonViewerDialogSetting): Observable<boolean> {

    const modalRef = this.modalService.open(JsonViewerDialogComponent, {centered: true, size: setting.size, scrollable: true});
    modalRef.componentInstance.title = setting.title || 'JSON Viewer';
    modalRef.componentInstance.content = setting.content;
    return from(modalRef.result)
  }
}
