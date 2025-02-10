import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import {NgModel} from "@angular/forms";
import {CustomErrorComponent} from "./custom-error.component";

@Directive({
  selector: '[customError][ngModel]',
  // hostDirectives: [ModelEmptyValueClassDirective]
})
export class CustomErrorDirective implements OnInit, AfterViewInit {

  readonly emptyClass = 'app-model-empty-value'
  @Input("customError") constraint: { [constraint: string]: string }
  @Input("customErrorAppendTo") customErrorAppendTo: string;

  // private _validator: { [id: string]: ValidatorFn | ValidatorFn[] } = {};

  constructor(public elementRef: ElementRef,
              public viewContainerRef: ViewContainerRef,
              public ngModel: NgModel,
              public renderer: Renderer2,
              private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.ngModel.valueChanges
      .subscribe(value => {
        console.log('value changes = ', value)
        this.detectChange(value);
      });
  }

  detectChange(value) {
    if (value == undefined || value === '') {
      this.renderer.addClass(this.elementRef.nativeElement, this.emptyClass);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, this.emptyClass);
    }
    if (this.ngModel?.invalid && (this.ngModel?.dirty || this.ngModel.touched)) {
      if (this.viewContainerRef.get(0)) {
        this.viewContainerRef.remove();
      }
      for (let constraint in this.constraint) {
        if ((this.ngModel.dirty && this.ngModel.touched) && this.ngModel.errors?.[constraint]) {
          let errorComponent = this.viewContainerRef.createComponent(CustomErrorComponent);
          errorComponent.instance.error = this.constraint[constraint];
          // console.log('customErrorAppendTo ', this.customErrorAppendTo)
          // if (this.customErrorAppendTo) {
          //   let appendToElement = document.querySelector(this.customErrorAppendTo);
          //   console.log('appendToElement = ', appendToElement);
          //   this.renderer.appendChild(appendToElement, componentRef);
          // }
        }
      }
    } else {
      this.viewContainerRef.remove();
    }
  }
}
