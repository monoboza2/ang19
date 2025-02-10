import {NgbDateAdapter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Injectable} from "@angular/core";
import {ACCEPT_DATE_FORMAT, INPUT_MASK_DATE_FORMAT, ISODATE_FORMAT} from "./date-format";
import {StringUtils} from "./utils/string-utils";

export declare class CustomNgbDateNativeAdapter extends NgbDateAdapter<string> {
  /**
   * Converts native date to a NgbDateStruct
   */
  fromModel(date: string): NgbDateStruct;

  /**
   * Converts a NgbDateStruct to a native date
   */
  toModel(date: NgbDateStruct): string;
}

@Injectable()
export class CustomNgbDateNativeAdapterToString implements CustomNgbDateNativeAdapter {
  fromModel(date: string): NgbDateStruct {
    if (!!date) {
      if (INPUT_MASK_DATE_FORMAT.test(date)) {
        if (ACCEPT_DATE_FORMAT.test(date)) {
          let value: string[] = date.split('/');
          let isoDate = `${Number(value[2]) - 543}-${value[1]}-${value[0]}`;
          return this.fromModel(isoDate);
        }
      } else {
        if (ISODATE_FORMAT.test(date)) {
          let str = date.split('-');
          return {year: Number(str[0]), month: Number(str[1]), day: Number(str[2].split('T')[0])};
        }
      }
    }
    return undefined;
  }

  toModel(date: NgbDateStruct): string {
    let result;
    if (date) {
      let day = StringUtils.paddingZeroLeft(date.day, 2);
      let month = StringUtils.paddingZeroLeft(date.month, 2);
      let year = StringUtils.paddingZeroLeft(date.year, 4);
      result = `${year}-${month}-${day}`;
    }
    return result;
  }

}
