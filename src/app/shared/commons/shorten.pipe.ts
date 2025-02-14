import {Pipe, PipeTransform} from '@angular/core';

export function isString(value: any) {
  return typeof value === 'string';
}

/**
 * copy from ngx-pipes
 */
@Pipe({name: 'shorten', standalone: true})
export class ShortenPipe implements PipeTransform {
  transform(input: string, length?: number, suffix?: string, wordBreak?: boolean): string;
  transform(input: any, length?: number, suffix?: string, wordBreak?: boolean): any;

  transform(text: any, length: number = 0, suffix: string = '', wordBreak: boolean = true): string {
    if (!isString(text)) {
      return text;
    }

    if (text.length > length) {
      if (wordBreak) {
        return text.slice(0, length) + suffix;
      }

      if (!!~text.indexOf(' ', length)) {
        return text.slice(0, text.indexOf(' ', length)) + suffix;
      }
    }

    return text;
  }
}
