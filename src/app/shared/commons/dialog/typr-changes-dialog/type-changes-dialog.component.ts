import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './type-changes-dialog.component.html',
  styleUrls: ['./type-changes-dialog.component.css']
})
export class TypeChangesDialogComponent implements OnInit {

  @Input() content: string = 'ยืนยันการบันทึกข้อมูล';
  @Input() title: string = 'การแจ้งเตือน';
  @Input() isInnerHTML: boolean = false;
  confirmButtonMsg = 'ยืนยัน';
  closeButtonMsg = 'ยกเลิก';

  @Output() confirmEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  confirm(): void {
    this.confirmEmit.emit(true);
    this.activeModal.close(true)
  }

  cancel(): void {
    this.confirmEmit.emit(false);
    this.activeModal.close(false)
  }
}
