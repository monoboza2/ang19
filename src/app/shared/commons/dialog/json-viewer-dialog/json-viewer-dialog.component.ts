import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-json-viewer-dialog',
    templateUrl: './json-viewer-dialog.component.html',
    styleUrls: ['./json-viewer-dialog.component.css']
})
export class JsonViewerDialogComponent implements OnInit {

    @Input()
    content: string = '';

    @Input()
    title: string = 'JSON Viewer';

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
