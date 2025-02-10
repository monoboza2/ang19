import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-confirm-dialog',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() content: string = 'ยืนยันการบันทึกข้อมูล';
  @Input() title: string = 'การแจ้งเตือน';
  @Input() isInnerHTML: boolean = false;
  @Input() confirmButtonMsg = 'ยืนยัน';
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
