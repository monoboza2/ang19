import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-progression-dialog',
    templateUrl: './progression-dialog.component.html',
    styleUrls: ['./progression-dialog.component.css']
})
export class ProgressionDialogComponent implements OnInit {

    @Input()
    content: string = '';

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
