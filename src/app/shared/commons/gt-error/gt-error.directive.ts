import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef} from '@angular/core';
import {GtErrorComponent} from "./gt-error.component";

@Directive({
    selector: '[gt-error]'
})
export class GtErrorDirective implements OnInit {

    @Input("gt-error") field: string;
    @Input("gt-error-context") context: any;
    @Input("gt-error-field-set") fieldSet: { label: string, field: string }[];
    @Input("gt-error-tooltip") tooltip: boolean = false;
    @Input("gt-error-node") node: string;
    @Output() onError = new EventEmitter<boolean>();

    constructor(public elementRef: ElementRef,
                public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.displayError();
    }

    private displayError() {
        let gtErrorComponentRef = this.viewContainerRef.createComponent(GtErrorComponent);
        if (this.node) {
            gtErrorComponentRef.instance.field = `${this.node}.${this.field}`;
            this.fieldSet.forEach(value => value.field = `${this.node}.${value.field}`)
            gtErrorComponentRef.instance.fieldSet = this.fieldSet;
            gtErrorComponentRef.instance.context = this.context;
        } else {
            gtErrorComponentRef.instance.field = this.field;
            gtErrorComponentRef.instance.fieldSet = this.fieldSet;
            gtErrorComponentRef.instance.context = this.context;
        }
    }
}
