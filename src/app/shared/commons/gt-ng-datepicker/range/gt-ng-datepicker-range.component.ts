import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'gt-ng-datepicker-range',
    templateUrl: './gt-ng-datepicker-range.component.html',
    styleUrls: ['./gt-ng-datepicker-range.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GtNgDatepickerRangeComponent),
            multi: true
        },
    ],
})
export class GtNgDatepickerRangeComponent implements OnInit, AfterViewInit, ControlValueAccessor {

    private _value: string[];

    @Input() id: string;
    @Input() name: string;
    @Input() readonly: boolean = false;

    @ViewChild("datepicker", {static: true}) datepicker: ElementRef;

    hoveredDate: NgbDate | null = null;
    fromDate: NgbDate | null;
    toDate: NgbDate | null;

    onChangeCallBack: (_: any) => void = () => {
    };
    onTouchCallBack: () => void = () => {
    };

    constructor(public elementRef: ElementRef,
                private cdr: ChangeDetectorRef,
                private renderer: Renderer2,
                private calendar: NgbCalendar,
                private adapter: NgbDateAdapter<string>,
                public formatter: NgbDateParserFormatter) {
    }

    ngOnInit(): void {
    }

    //range properties
    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
            this.toDate = date;
        } else if (this.fromDate && !this.toDate) {
          this.toDate = date;
          this.fromDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
        this.value = [this.adapter.toModel(this.fromDate), this.adapter.toModel(this.toDate)];
    }

    isHovered(date: NgbDate) {
        return (
            this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
        );
    }

    isInside(date: NgbDate) {
        return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return (
            date.equals(this.fromDate) ||
            (this.toDate && date.equals(this.toDate)) ||
            this.isInside(date) ||
            this.isHovered(date)
        );
    }

    //range properties

    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
        const parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
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

    widthAuto() {
        // this.elementRef.nativeElement.querySelector(".dropdown-menu").style.width = "auto";
    }

    set value(val: string[]) {

        this._value = val;
        if (val?.length) {
            if (val.length >= 2) {
                this.fromDate = NgbDate.from(this.adapter.fromModel(val[0]));
                this.toDate = NgbDate.from(this.adapter.fromModel(val[1]));
            } else {
                this.fromDate = NgbDate.from(this.adapter.fromModel(val[0]));
                this.toDate = NgbDate.from(this.adapter.fromModel(val[0]));
            }
        }
        this.onChangeCallBack(this._value);
        this.onTouchCallBack();
        this.cdr.detectChanges();
    }

    get value(): string[] {
        return this._value;
    }

    displayValue() {
        if (this.fromDate && this.toDate) {
            return this.formatter.format(this.fromDate) + ' - ' + this.formatter.format(this.toDate);
        } else if (this.fromDate) {
            return this.formatter.format(this.fromDate) + ' - ∞';
        } else if (this.toDate) {
            return '∞ - ' + this.formatter.format(this.toDate);
        } else {
            return '';
        }
    }
}
