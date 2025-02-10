import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgbDate, NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DateSetAdapter} from './date-set-adapter';

@Component({
    selector: 'gt-ng-datepicker-multi-select',
    templateUrl: './gt-ng-datepicker-multi-select.component.html',
    styleUrls: ['./gt-ng-datepicker-multi-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GtNgDatepickerMultiSelectComponent),
            multi: true
        }
    ]
})
export class GtNgDatepickerMultiSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {

    @Input() dateLabel: string;
    @Output() dateLabelChange = new EventEmitter();
    hasError = false;
    @Input() hasTime: boolean = false;
    @Input() id: string;
    @Input() name: string;
    @Input() disabled: boolean;
    @Input() readonly: boolean;
    @Input() minDate: NgbDateStruct;

    model: string[] = [];

    onChangeCallBack: (_: any) => void = () => {
    };

    onTouchCallBack: () => void = () => {
    };

    constructor(public elementRef: ElementRef,
                private _cdr: ChangeDetectorRef,
                private adapeter: NgbDateAdapter<string>,
                private _dateSetAdapter: DateSetAdapter) {
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
        this.model = !obj || !obj.length ? [] : obj;
        this.dateLabel = this._dateSetAdapter.convertToDateRangeString(this.model);
        // this.value = !obj || !obj.length ? [] : obj[0];
    }

    error() {
        this.hasError = true;
    }

    addOrRemoveValue(ngbDate: NgbDate) {
        const parsedVal = this.adapeter.toModel(ngbDate);
        if (this.model.includes(parsedVal)) {
            this.model.splice(this.model.indexOf(parsedVal), 1);
        } else {
            this.model.push(parsedVal);
        }
        this.dateLabel = this._dateSetAdapter.convertToDateRangeString(this.model);
        this.dateLabelChange.emit(this.dateLabel)
        this.onChangeCallBack(this.model);
    }

    isDateSelected(ngbDate: NgbDate): boolean {
        return this.model.includes(this.adapeter.toModel(ngbDate));
    }
}
