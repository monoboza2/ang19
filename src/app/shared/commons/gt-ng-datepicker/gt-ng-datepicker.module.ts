import {NgModule} from "@angular/core";
import {GtNgDatepickerComponent} from "./gt-ng-datepicker.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GtNgDatepickerMaskDirective} from "./gt-ng-datepicker-mask.directive";
import {GtTimeMaskDirective} from "./gt-time-mask.directive";
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbModule,
  NgbTimeAdapter,
  NgbTimepickerI18n,
  NgbTimepickerModule
} from "@ng-bootstrap/ng-bootstrap";
import {CustomNgbDateNativeAdapterToString} from "./date-native-adaptor";
import {CustomDatepickerI18n, I18n} from "./custom-datepicker";
import {CustomNgbDateParser} from "./custom-ngb-date-parser";
import {CustomNgbTimeAdapter} from "./custom-time-native-adaptor";
import {CustomTimepickerI18n} from "./custom-timepicker";
import {InputMaskModule} from "@ngneat/input-mask";
import {GtNgDatepickerRangeComponent} from "./range/gt-ng-datepicker-range.component";
import {GtNgDatepickerMultiSelectComponent} from "./multi-select/gt-ng-datepicker-multi-select.component";

@NgModule({
  declarations: [
    GtNgDatepickerComponent,
    GtNgDatepickerRangeComponent,
    GtNgDatepickerMultiSelectComponent,
    GtNgDatepickerMaskDirective,
    GtTimeMaskDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbTimepickerModule,
    InputMaskModule
  ],
  providers: [
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateAdapter, useClass: CustomNgbDateNativeAdapterToString},
    {provide: NgbDateParserFormatter, useClass: CustomNgbDateParser},
    {provide: NgbTimeAdapter, useClass: CustomNgbTimeAdapter},
    {provide: NgbTimepickerI18n, useClass: CustomTimepickerI18n},
    GtNgDatepickerMaskDirective
  ],
  exports: [
    GtNgDatepickerComponent,
    GtNgDatepickerRangeComponent,
    GtNgDatepickerMultiSelectComponent,
    GtNgDatepickerMaskDirective,
    GtTimeMaskDirective,
  ]
})
export class GtNgDatepickerModule {
}
