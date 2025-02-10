import {Pipe, PipeTransform} from '@angular/core';
import {IdentityCardType} from "../../../generated-model/model";

@Pipe({
  standalone: true,
  name: 'cardTypeFilter'
})
export class CardTypeFilterPipe implements PipeTransform {

  transform(values: IdentityCardType[], options: {
    exclude: string[]
  }): IdentityCardType[] {
    return values.filter(e => !(options?.exclude || []).includes(e.code));
  }

}
