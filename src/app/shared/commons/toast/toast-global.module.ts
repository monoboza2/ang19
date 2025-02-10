import {NgModule} from '@angular/core';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastsContainer} from './toast-container.component';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule, NgbToastModule],
  declarations: [ToastsContainer],
  exports: [
    ToastsContainer
  ]
})
export class NgbdToastGlobalModule {
}
