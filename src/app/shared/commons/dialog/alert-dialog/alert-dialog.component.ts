import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
  imports: [
    NgClass
  ],
  standalone: true
})
export class AlertDialogComponent implements OnInit {

  @Input()
  type?: 'info' | 'warning' | 'danger' = 'info';

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
