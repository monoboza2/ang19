import {Pipe, PipeTransform} from '@angular/core';
import {SrmRegisterFileDto} from "../../../generated-model/model";
import {KeyValue} from "@angular/common";

@Pipe({
  standalone: true,
  name: 'fileGroupFilter'
})
export class FileGroupFilterPipe implements PipeTransform {

  transform(values: KeyValue<string, SrmRegisterFileDto>[], group: string): KeyValue<string, SrmRegisterFileDto>[] {
    return values.filter(e => e.value.fileType?.group == group);
  }

}
