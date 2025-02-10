import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css'],
  imports: [],
  standalone: true
})
export class SuccessDialogComponent implements OnInit {
  @Input()
  content: string = '';
  @Input()
  title: string = 'การแจ้งเตือน';
  @Input()
  isInnerHTML: boolean = false;

  @Output()
  confirmEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  close() {
    this.confirmEmit.emit(false);
  }

  emit() {
    this.confirmEmit.emit(true);
  }
}
