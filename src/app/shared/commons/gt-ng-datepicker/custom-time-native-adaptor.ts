import {Injectable} from '@angular/core';
import {NgbTimeAdapter, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {ISOTIME_FORMAT} from "./date-format";
import {StringUtils} from "./utils/string-utils";

@Injectable()
export class CustomNgbTimeAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string): NgbTimeStruct {
    if (!!value) {
      console.log('value = ', value);
      if (ISOTIME_FORMAT.test(value)) {
        const hour: number = Number(value.substring(0, 2));
        const minute: number = Number(value.substring(3, 5));
        const second: number = Number(value.substring(6, 8));
        return {hour: hour, minute: minute, second: second};
      }
      // throw Error("Invalid date ");
      console.warn("Invalid date")
      return {} as NgbTimeStruct;
    } else {
      return undefined;
    }
  }

  toModel(time: NgbTimeStruct): string {
    if (!!time) {
      return `${StringUtils.paddingZeroLeft(time.hour, 2)}:${StringUtils.paddingZeroLeft(time.minute, 2)}:${StringUtils.paddingZeroLeft(time.second, 2)}`;
    }
    return undefined;
  }
}
