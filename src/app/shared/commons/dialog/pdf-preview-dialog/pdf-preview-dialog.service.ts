import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable} from "rxjs";
import {PdfPreviewDialogComponent} from "./pdf-preview-dialog.component";

@Injectable({providedIn: 'root'})
export class PdfPreviewDialogService {

  constructor(private modalService: NgbModal) {
  }

  open(setting?: any): Observable<boolean> {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(PdfPreviewDialogComponent, {
      backdrop: 'static',
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.url = setting?.url;
    modalRef.componentInstance.params = setting?.params;
    modalRef.componentInstance.title = setting?.title;
    modalRef.componentInstance.previewMode = setting?.previewMode;
    if (!setting.previewMode) {
      return from(modalRef.result)
    } else {
      return from(modalRef.result)
    }
  }

  close() {
    this.modalService.dismissAll();
  }
}
