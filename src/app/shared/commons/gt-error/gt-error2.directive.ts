import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef} from '@angular/core';
import {GtErrorComponent} from "./gt-error.component";

@Directive({
  selector: '[gt-error-expanded]'
})
export class GtError2Directive implements OnInit {

  @Input("gt-error-field") field: string;
  @Input("fieldMatchOption") fieldMatchOption: 'startsWith' | 'exact' = 'startsWith';
  @Output() onError = new EventEmitter<boolean>();

  constructor(public viewContainerRef: ViewContainerRef,
              public elementRef: ElementRef,
              private render: Renderer2) {
  }

  ngOnInit(): void {

    let gtErrorComponentRef = this.viewContainerRef.createComponent(GtErrorComponent);
    gtErrorComponentRef.instance.field = this.field;
    gtErrorComponentRef.instance.fieldMatchOption = this.fieldMatchOption;
    gtErrorComponentRef.instance.observeMessage = false;
    gtErrorComponentRef.instance.onError
      .subscribe(e => {
        if (e) {
          this.onError.emit(e);
        }
      });
  }

}
