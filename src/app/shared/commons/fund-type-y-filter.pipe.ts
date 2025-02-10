import {Pipe, PipeTransform} from '@angular/core';
import {PersonalFundInfo} from "../../../generated-model/model";

@Pipe({
  standalone: true,
  name: 'fundTypeY'
})
export class FundTypeYFilterPipe implements PipeTransform {

  transform(values: PersonalFundInfo[]): PersonalFundInfo[] {
    let result = values.filter(e => e.fundType == 'Y');
    if (result.length) {
      return [result[0]];
    }
    return result;
  }

}
