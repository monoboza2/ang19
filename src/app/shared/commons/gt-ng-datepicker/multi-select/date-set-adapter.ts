import {Injectable} from '@angular/core';

// import * as moment from 'moment';

@Injectable({providedIn: 'root'})
export class DateSetAdapter {

  convertToDateRangeString(dateSet: Array<Date | string>, format = 'D/M/YYYY'): string {
    // moment.locale('th');
    if (!dateSet) {
      dateSet = [];
    }
    let auditedDateSet = dateSet.map(s => typeof s === 'string' ? new Date(s) : s);
    if (auditedDateSet.length === 0) {
      return '';
    } else if (auditedDateSet.length === 1) {
      return this.formatToThDate(auditedDateSet[0], format);
    } else {
      auditedDateSet = auditedDateSet.sort((a, b) => a.getTime() < b.getTime() ? -1 : 1);
      const groupMonth: Array<Date[]> = [];
      auditedDateSet.forEach((currentIndexDate, index) => {
        if (index === 0) {
          groupMonth.push([currentIndexDate]);
        } else {
          const matchGroup = groupMonth.find(dates => {
            const lastIndexDate = dates[dates.length - 1];
            return currentIndexDate.getMonth() === lastIndexDate.getMonth() &&
              currentIndexDate.getFullYear() === lastIndexDate.getFullYear();
          });
          if (matchGroup) {
            matchGroup.push(currentIndexDate);
          } else {
            groupMonth.push([currentIndexDate]);
          }
        }
      });
      return groupMonth.map(group => {
        if (group.length > 1) {
          const groupDate: Array<Date[]> = [];
          group.forEach((date, index) => {
            if (index === 0) {
              groupDate.push([date]);
            } else {
              const matchGroup = groupDate.find(dateInGroup => {
                const lastDate = dateInGroup[dateInGroup.length - 1];
                return lastDate.getDate() + 1 === date.getDate();
              });
              if (matchGroup) {
                matchGroup.push(date);
              } else {
                groupDate.push([date]);
              }
            }
          });
          return groupDate.map((item, index) => {
            if (index === groupDate.length - 1) {
              return item.length > 1 ?
                item[0].getDate() + '-' + this.formatToThDate(item[item.length - 1], format) :
                this.formatToThDate(item[0], format);
            } else {
              return (item.length > 1 ? item[0].getDate() + '-' + item[item.length - 1].getDate() : item[0].getDate());
            }
          });
        } else {
          return this.formatToThDate(group[0], format);
        }
      }).join(' , ');
    }
  }

  formatToThDate(value: Date, format = 'D/M/YYYY'): string {
    alert("not implemented yet.");
    return '';
    // return moment(value).add(543, 'years').format(format);
  }
}
