import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {Subscription} from "rxjs";
import {GtNgDatepickerComponent} from "../gt-ng-datepicker/gt-ng-datepicker.component";
import {DOCUMENT} from "@angular/common";
import {NgSelectComponent} from "@ng-select/ng-select";
import {HttpContextToken} from "@angular/common/http";
import {ValidateService} from "../services/validate.service";

export const VALIDATE_CONTEXT = new HttpContextToken<string>(() => undefined);

@Component({
  selector: 'gt-error',
  templateUrl: './gt-error.component.html',
  styleUrls: ['./gt-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GtErrorComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() field: string = '';
  @Input() fieldSet: { label: string, field: string }[] = [];
  @Input() code: string;
  @Input() forComponent: ElementRef | HTMLElement | NgSelectComponent;
  @Input() forId: string;
  @Input() fieldMatchOption: 'startsWith' | 'exact' = 'exact';
  @Input() context: string;
  @Input() defaultStyle: boolean = false;
  @Output() onError = new EventEmitter<boolean>();

  forHtmlElement: HTMLElement
  message: string = null;
  isHTML: boolean = false;
  observeMessage: boolean = true;

  //inject area
  renderer: Renderer2;
  validateService: ValidateService;
  cdr: ChangeDetectorRef;
  document: Document;

  private serverErrorSubscription: Subscription;
  private clientErrorSubscription: Subscription;

  constructor(private elementRef: ElementRef, private injector: Injector) {

    this.renderer = injector.get(Renderer2);
    this.validateService = injector.get(ValidateService);
    this.cdr = injector.get(ChangeDetectorRef);
    this.document = injector.get(DOCUMENT);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.serverErrorSubscription = this.validateService.serverErrors
      .subscribe(value => {
        if (value && value.response?.error && value.response?.error.errors) {
          console.log('this.context ', this.context, 'value.context ', value.context);
          if (!!value.context) {
            if (value.context == this.context) {
              this.changeMessage(value.response?.error.errors);
              this.cdr.detectChanges();
            }
          } else {
            this.changeMessage(value.response?.error.errors);
            this.cdr.detectChanges();
          }
        } else {
          this.message = '';
          this.removeErrorClass(this.forComponent);
          this.cdr.detectChanges();
        }
      });

    this.clientErrorSubscription = this.validateService.clientErrors
      .subscribe(value => {
        if (value) {
          if (value.field == this.field) {
            this.message = value.message;
            if (this.message.length) {
              this.addErrorClass(this.forComponent);
            } else {
              this.removeErrorClass(this.forComponent);
              this.message = null
            }
            this.cdr.detectChanges();
          }
        } else {
          this.message = '';
          this.removeErrorClass(this.forComponent);
          this.cdr.detectChanges();
        }
      });
  }

  private changeMessage(violations: any[]) {
    if (!this.fieldSet?.length) {
      if (this.code) {
        violations = violations.filter(e => e.codes.includes(this.code));
      }
      if (this.field) {
        if (this.fieldMatchOption == "exact") {
          violations = violations.filter(e => e.field === this.field);
        } else {
          violations = violations.filter(e => e.field?.startsWith(this.field));
        }
      }
      this.message = violations.map(e => e['defaultMessage']).reduce((prev, curr) => curr, "");
    } else {
      let messageList: any[] = [];
      for (let option of this.fieldSet) {
        let defaultMessage = violations
          .filter(e => e.field === option.field)
          .map(e => e['defaultMessage'])
          .reduce((prev, curr) => curr, "");
        if (!!defaultMessage) {
          messageList.push({option: option, message: defaultMessage});
        }
      }
      if (messageList.length) {
        this.isHTML = true;
        this.message = "กรุณาตรวจสอบข้อมูลต่อไปนี้";
        messageList.forEach(value => {
          this.message = `${this.message + '* ' + value.option.label + ' - ' + value.message}`;
        });
      }
    }
    if (this.message.length) {
      this.addErrorClass(this.forComponent);
    } else {
      this.removeErrorClass(this.forComponent);
      this.message = null
    }
  }

  private addErrorClass(forComponent: ElementRef | HTMLElement | NgSelectComponent) {

    this.onError.emit(true);

    if (forComponent) {
      if (forComponent instanceof GtNgDatepickerComponent) {
        forComponent.error();
      } else if (forComponent instanceof NgSelectComponent) {
        if (!!forComponent.element.children && forComponent.element.children.length) {
          this.renderer.setStyle(forComponent.element.children[0], 'border', '1px solid #f86c6b');
          this.renderer.setStyle(forComponent.element.children[0], 'border', '1px solid #f86c6b');
        }
      }
    } else if (this.forId) {
      //cache this.forHtmlElement for future use to reduce time to lookup element
      this.forHtmlElement = this.forHtmlElement || this.document.getElementById(this.forId);
    }
  }

  private removeErrorClass(forComponent: ElementRef | HTMLElement | NgSelectComponent) {

    this.onError.emit(false);

    if (forComponent) {
      if (forComponent instanceof GtNgDatepickerComponent) {
        forComponent.clearError();
      }
    }
  }

  ngOnDestroy(): void {
    this.cdr.detach();
    if (this.serverErrorSubscription && !this.serverErrorSubscription.closed) {
      this.serverErrorSubscription.unsubscribe();
    }
    if (this.clientErrorSubscription && !this.clientErrorSubscription.closed) {
      this.clientErrorSubscription.unsubscribe();
    }
  }
}
