import {AfterViewInit, Directive, ElementRef} from "@angular/core";

@Directive({
  selector: '[gtDatepickerInputMask]'
})
export class GtNgDatepickerMaskDirective implements AfterViewInit {

  constructor(private _elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      // let im = new Inputmask("99/99/9999");
      // im.mask(this._elementRef.nativeElement);
    });
  }

}
