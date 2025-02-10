import {AfterViewInit, Directive, ElementRef} from "@angular/core";

@Directive({
  selector: '[gtTimeInputMask]'
})
export class GtTimeMaskDirective implements AfterViewInit {

  constructor(private _elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {

    setTimeout(() => {

      // let value = this._elementRef.nativeElement?.value;
      // if (ISODATETIME_FORMAT.test(value)) {
      //   this._elementRef.nativeElement.value = value.split('T')[1];
      // }
      // let im = new Inputmask({regex: '^([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'});
      // im.mask(this._elementRef.nativeElement);
      throw Error("Not implement yet.");
    });
  }

}
