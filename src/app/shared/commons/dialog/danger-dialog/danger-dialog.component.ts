import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-danger-dialog',
  templateUrl: './danger-dialog.component.html',
  styleUrls: ['./danger-dialog.component.css'],
  imports: [
    NgClass
  ],
  standalone: true
})
export class DangerDialogComponent implements OnInit {

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
