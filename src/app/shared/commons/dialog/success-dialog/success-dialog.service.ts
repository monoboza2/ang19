import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable} from "rxjs";
import {SuccessDialogComponent} from "./success-dialog.component";

@Injectable({providedIn: 'root'})
export class SuccessDialogService {

  constructor(private modalService: NgbModal) {
  }

  open(content: string): Observable<boolean> {
    this.modalService.dismissAll('force');
    const modalRef = this.modalService.open(SuccessDialogComponent, {
      backdrop: 'static',
      centered: true,
    });
    modalRef.componentInstance.content = content;
    return from(modalRef.result)
  }
}
