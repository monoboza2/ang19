/**
 * Created by neng on 23/10/2559.
 */
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'thaidatetime',
  standalone: true
})

export class ThaiDateTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      if ((typeof value) === 'string') {
        let part = value.split(/[^0-9]/);
        if (part.length == 6) {
          value = new Date(part[0], part[1] - 1, part[2], part[3], part[4], part[5]);
        } else if (part.length == 7) {
          value = new Date(part[0], part[1] - 1, part[2], part[3], part[4], part[5], part[6]);
          // value = new Date(value)
        } else {
          value = new Date(part[0], part[1] - 1, part[2]);
        }
      }
      let defaultOption = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        showTime: true,
        full: false
      };
      let options = {...defaultOption, ...args};
      if (!!options.showTime) {
        let options = {...defaultOption, ...args};
        let dateFormat = {year: options.year, month: options.month, day: options.day};
        let timeFormat = {hour: options.hour, minute: options.minute};
        let date: string = value.toLocaleDateString("th-TH", dateFormat);
        let time: string = value.toLocaleTimeString("th-TH", timeFormat);
        return options.full ? date + " เวลา " + time + " น." : date + " " + time + " น.";
      } else {
        let options = {...defaultOption, ...args};
        let dateFormat = {year: options.year, month: options.month, day: options.day};
        return value.toLocaleDateString("th-TH", dateFormat);
      }
    } else {
      return "";
    }

  }
}

