import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Host,
  inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges
} from "@angular/core";
import {NgModel} from "@angular/forms";

@Directive({
  selector: '[formDisabled]'
})
export class FormDisabledDirective implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {

  @Input("disabledOptions") options: { native?: boolean, bindLabel?: string, value?: string, preview?: boolean };
  private readonlyElement: any;
  @Input("markDisabled") markDisabled: boolean = true;

  constructor(private elementRef: ElementRef, @Host() @Optional() private ngModel: NgModel, private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    if (this.ngModel) {
      this.ngModel.valueChanges
        .subscribe(value => {
          this.detectFormDisabled();
        });
    }
  }

  ngAfterViewInit(): void {
    this.detectFormDisabled();
  }

  ngAfterViewChecked(): void {
  }

  private disableInput() {
    this.renderer.removeClass(this.elementRef.nativeElement, 'form-control');
    this.renderer.addClass(this.elementRef.nativeElement, 'form-control-plaintext');
    this.renderer.addClass(this.elementRef.nativeElement, 'form-disabled');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'readonly', '');
  }

  private removeUiRequired() {
    document.querySelectorAll(`label[for="${this.elementRef.nativeElement.id}"]`)
      .forEach(label => {
        this.renderer.removeClass(label, 'ui-require');

        if (!label?.classList?.contains('col-form-label-plaintext')) {
          this.renderer.addClass(label, 'col-form-label-plaintext');
        }
      });
  }

  private addUiRequired() {
    document.querySelectorAll(`label[for="${this.elementRef.nativeElement.id}"]`)
      .forEach(label => {
        this.renderer.addClass(label, 'ui-require');
      });
  }

  private enableInput() {
    if (this.options?.native) {
      this.renderer.addClass(this.elementRef.nativeElement, 'form-control');
      this.renderer.removeClass(this.elementRef.nativeElement, 'form-control-plaintext');
      this.renderer.removeClass(this.elementRef.nativeElement, 'form-disabled');
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'readonly', '');
    } else {
      this.showHostElement();
      this.removeReadonlyElement();
    }
  }

  private checkIfParentFieldsetDisabled() {
    let fieldsetParentList = document.querySelectorAll(`fieldset[disabled] label[for="${this.elementRef.nativeElement.id}"]`);
    if (fieldsetParentList?.length) {
      if (this.options?.native) {
        this.renderer.removeClass(this.elementRef.nativeElement, 'form-control');
        this.renderer.addClass(this.elementRef.nativeElement, 'form-control-plaintext');
        this.renderer.addClass(this.elementRef.nativeElement, 'form-disabled');
        this.renderer.setAttribute(this.elementRef.nativeElement, 'readonly', '');
      } else {
        this.removeReadonlyElement();
        this.createFormControlPlainTextElement();
        this.hideHostElement();
      }
      this.removeUiRequired();
    }
  }

  private hideHostElement() {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
  }

  private showHostElement() {
    this.renderer.removeAttribute(this.elementRef.nativeElement, 'hidden');
  }

  private cdr = inject(ChangeDetectorRef);

  private createFormControlPlainTextElement() {
    // this.readonlyElement = this.renderer.createElement("input");
    this.readonlyElement = this.renderer.createElement("div");
    if (this.options?.bindLabel) {
      try {
        this.readonlyElement.value = this.ngModel?.model[this.options?.bindLabel] || '-';
        this.readonlyElement.innerText = this.ngModel?.model[this.options?.bindLabel] || '-'; //for div
      } catch (e) {
        //do nothing
      }
    } else if (this.options?.value) {
      try {
        this.readonlyElement.value = this.options?.value;
        this.readonlyElement.innerText = this.options?.value; //for div
      } catch (e) {
        //do nothing
      }
    } else {
      this.readonlyElement.value = this.ngModel?.model;
      this.readonlyElement.innerText = this.ngModel?.model; //for div
    }
    // this.renderer.setStyle(this.readonlyElement, 'line-height', '2rem');
    this.renderer.addClass(this.readonlyElement, 'form-control-plaintext');
    this.renderer.addClass(this.readonlyElement, 'form-disabled');
    this.renderer.setAttribute(this.readonlyElement, 'readonly', '');
    this.renderer.insertBefore(this.elementRef.nativeElement?.parentElement, this.readonlyElement, this.elementRef.nativeElement?.parentElement?.firstChild);
  }

  private removeReadonlyElement() {
    if (this.readonlyElement) {
      this.renderer.removeChild(this.elementRef.nativeElement?.parentElement, this.readonlyElement);
    }
  }

  private detectFormDisabled() {
    if (this.markDisabled) {
      if (!this.options?.preview) {
        if (this.elementRef.nativeElement.disabled) {
          // console.log('{1}');
          this.disableInput();
          this.removeUiRequired();
          let fieldsetParentList = document.querySelectorAll(`fieldset[disabled] label[for="${this.elementRef.nativeElement.id}"]`);
          if (fieldsetParentList?.length) {
            this.disableInput();
          }
        } else if (!this.options?.native) {
          // console.log('{2}');
          this.removeReadonlyElement();
          this.createFormControlPlainTextElement();
          this.hideHostElement();
          this.removeUiRequired();
        } else {
          // console.log('{3}');
          this.enableInput();
          this.addUiRequired();
          this.checkIfParentFieldsetDisabled();
        }
      }
    }
  }
}
