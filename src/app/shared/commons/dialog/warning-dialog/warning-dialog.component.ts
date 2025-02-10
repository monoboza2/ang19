import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxJsonViewerModule} from "ngx-json-viewer";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css'],
  imports: [
    NgxJsonViewerModule,
    NgIf
  ],
  standalone: true
})
export class WarningDialogComponent implements OnInit {

  @Input()
  content: string = '';

  @Input()
  title: string = 'การแจ้งเตือน';

  @Input()
  isInnerHTML: boolean = false;

  @Input()
  isJSON: boolean = false;

  @Input()
  json: any;

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
