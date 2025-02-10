import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Injectable} from "@angular/core";
import {ACCEPT_DATE_FORMAT, INPUT_MASK_DATE_FORMAT, ISODATE_FORMAT} from "./date-format";
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;


@Injectable()
export class CustomNgbDateParser implements NgbDateParserFormatter {

  dateFormat: string;

  constructor() {
  }

  /**
   * Parses the entered date.
   * @param value the entered date.
   */
  parse(value: string): NgbDateStruct {
    let result;
    if (!!value) {
      if (INPUT_MASK_DATE_FORMAT.test(value)) {
        if (ACCEPT_DATE_FORMAT.test(value)) {
          let maskvalue: string[] = value.split('/');
          result = {year: Number(maskvalue[2]) - 543, month: maskvalue[1], day: maskvalue[0]};
        }
      } else {
        if (ISODATE_FORMAT.test(value)) {
          try {
            let date = new Date(value);
            date = new Date( date.getFullYear() - 543, date.getMonth(),date.getDate());
            result = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
          } catch (e) {
            console.warn(e);
          }
        }
      }
    }
    return result as NgbDateStruct;
  }

  /**
   * Formats a date into a language specific string.
   * @param date the data from the model.
   */
  format(date: NgbDateStruct): string {
    let formattedMomentDate = '';
    let value: Date;
    if (date) {
      value = new Date(date.year, date.month - 1, date.day);
      let options = {year: 'numeric', month: '2-digit', day: '2-digit'} as DateTimeFormatOptions;
      return value.toLocaleString('th-TH', options);
    }

    return formattedMomentDate;
  }
}
