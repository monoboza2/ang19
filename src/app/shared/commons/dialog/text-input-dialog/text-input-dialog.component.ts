import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-text-input-dialog',
  templateUrl: './text-input-dialog.component.html',
  styleUrls: ['./text-input-dialog.component.css']
})
export class TextInputDialogComponent implements OnInit {

  @Input() content: string = 'ยืนยันการบันทึกข้อมูล';
  @Input() title: string = 'การแจ้งเตือน';
  @Input() isInnerHTML: boolean = false;
  text: string;
  confirmButtonMsg = 'ยืนยัน';
  closeButtonMsg = 'ยกเลิก';

  @Output() confirmEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() saveEmit: EventEmitter<String> = new EventEmitter<String>();

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  confirm(): void {
    this.confirmEmit.emit(true);
    this.saveEmit.emit(this.text);
    this.activeModal.close(true);
  }

  cancel(): void {
    this.confirmEmit.emit(false);
    this.saveEmit.emit(null);
    this.activeModal.close(false);
  }
}
