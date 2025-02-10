import {AfterViewChecked, AfterViewInit, Directive, ElementRef, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[novalidateinput]'
})
export class NovalidateInputDirective implements OnInit, AfterViewInit, AfterViewChecked {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'novalidateinput');
  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {
  }
}
