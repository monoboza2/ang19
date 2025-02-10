import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable} from "rxjs";
import {DangerDialogComponent} from "./danger-dialog.component";

@Injectable({providedIn: 'root'})
export class DangerDialogService {

  constructor(private modalService: NgbModal) {
  }

  open(): Observable<boolean> {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(DangerDialogComponent, {
      backdrop: 'static',
      centered: true,
    });
    return from(modalRef.result)
  }
}
