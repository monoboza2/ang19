import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ACCEPT_DATE_FORMAT, ISODATE_FORMAT} from "./date-format";

@Component({
  selector: 'gt-ng-datepicker',
  templateUrl: './gt-ng-datepicker.component.html',
  styleUrls: ['./gt-ng-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GtNgDatepickerComponent),
      multi: true
    },
    // {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
})
export class GtNgDatepickerComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {

  value: string = undefined;
  correctFormat: boolean = true;
  hasError = false;
  @Input() hasTime: boolean = false;
  @Input() id: string;
  @Input() name: string;
  @Input() minDate: NgbDateStruct;
  @Input() maxDate: NgbDateStruct;
  @Input() disabled: boolean = false;
  @Input() markDisabled = false
  @Output() valueOnchange = new EventEmitter();
  @ViewChild("datepicker", {static: true})
  datepicker: ElementRef;
  touched = false;
  private adapeter: NgbDateAdapter<string> = inject(NgbDateAdapter);

  onChangeCallBack: (_: any) => void = () => {
  };
  onTouchCallBack: () => void = () => {
  };

  constructor(private cdr: ChangeDetectorRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  registerOnChange(fn: any): void {
    this.onChangeCallBack = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchCallBack = fn;
  }

  writeValue(obj: any): void {
    this.value = obj
  }

  error() {
    this.hasError = true;
    this.renderer.addClass(this.datepicker.nativeElement, 'ng-invalid');
  }

  clearError() {
    this.hasError = false;
    this.renderer.removeClass(this.datepicker.nativeElement, 'ng-invalid');
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouchCallBack();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes = ', changes);
  }

  valueChange() {
    if (this.value) {
      if (!!this.value && ACCEPT_DATE_FORMAT.test(this.value)) {
        let value: string[] = this.value.split('/');
        this.value = `${Number(value[2])}-${value[1]}-${value[0]}`;
      } else if (!!this.value && ISODATE_FORMAT.test(this.value)) {
        let T = this.value.indexOf('T');
        if (T == -1) {
          this.value = this.value.split('T')[0];
        }
      } else {
        this.value = undefined;
      }
      this.markAsTouched();
      this.correctFormat = !!this.value;
      this.cdr.detectChanges();
    }
    this.onChangeCallBack(this.value);
  }

  @Input()
  set minDateString(minDate: string) {
    if (minDate) {
      this.minDate = this.adapeter.fromModel(minDate)
    } else {
      this.minDate = undefined
    }
  }

  @Input()
  set maxDateString(maxDate: string) {
    if (maxDate) {
      this.maxDate = this.adapeter.fromModel(maxDate)
    } else {
      this.maxDate = undefined
    }
  }
}
