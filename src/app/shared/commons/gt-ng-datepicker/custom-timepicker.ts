import {Injectable} from '@angular/core';
import {NgbTimepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {I18n} from "./custom-datepicker";

const I18N_VALUES: { [id: string]: { periods: string[] } } = {
  'th': {periods: ['ก่อนเที่ยง', 'หลังเที่ยง']}
  // other languages you would support
};

// Define custom service providing the "AM" and "PM" translations.
@Injectable()
export class CustomTimepickerI18n extends NgbTimepickerI18n {
  constructor(private _i18n: I18n) {
    super();
  }

  getMorningPeriod(): string {
    return I18N_VALUES[this._i18n.language].periods[0];
  }

  getAfternoonPeriod(): string {
    return I18N_VALUES[this._i18n.language].periods[1];
  }
}
