import {NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {GtErrorComponent} from "./gt-error/gt-error.component";
import {GtError2Directive} from "./gt-error/gt-error2.directive";
import {GtErrorDirective} from "./gt-error/gt-error.directive";
import {GtNgDatepickerModule} from "./gt-ng-datepicker/gt-ng-datepicker.module";
import {FormDisabledDirective} from "./form-disabled.directive";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {Http400Interceptor} from "./interceptor/http400-interceptor";
import {Http404Interceptor} from "./interceptor/http404-interceptor";
import {Http409Interceptor} from "./interceptor/http409-interceptor";
import {Http424Interceptor} from "./interceptor/http424-interceptor";
import {Http5xxInterceptor} from "./interceptor/http5xx-interceptor";
import {NgbdToastGlobalModule} from "./toast/toast-global.module";
import {AppHeaderComponent} from "./app-header/app-header.component";
import {RouterModule} from "@angular/router";
import {CustomErrorDirective} from "./custom-error.directive";
import {NovalidateInputDirective} from "./novalidateinput.directive";
import {HttpGetUuidInterceptor} from "./interceptor/http-get-uuid-interceptor";
import {NetworkUnstableComponent} from "./network-unstable/network-unstable.component";
import {NgbModule, NgbPaginationModule, NgbScrollSpyModule, NgbScrollSpyService} from "@ng-bootstrap/ng-bootstrap";
import {AppVersionModule} from "./app-version/app-version.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {CustomErrorComponent} from "./custom-error.component";


@NgModule({
  declarations: [
    GtErrorComponent,
    GtError2Directive,
    GtErrorDirective,
    FormDisabledDirective,
    NovalidateInputDirective,
    AppHeaderComponent,
    CustomErrorDirective,
    NetworkUnstableComponent
  ],
  exports: [
    NgbModule,
    NgbScrollSpyModule,
    NgbPaginationModule,
    // NgbDropdownModule,
    NgbdToastGlobalModule,
    NgSelectModule,
    AppVersionModule,
    GtErrorComponent,
    GtError2Directive,
    GtErrorDirective,
    GtNgDatepickerModule,
    FormDisabledDirective,
    NovalidateInputDirective,
    AppHeaderComponent,
    CustomErrorDirective,
    NetworkUnstableComponent,
    CustomErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GtNgDatepickerModule,
    NgbModule,
    NgbScrollSpyModule,
    NgbPaginationModule,
    // NgbDropdownModule,
    NgSelectModule,
    NgbdToastGlobalModule,
    AppVersionModule,
    CustomErrorComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Http400Interceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Http404Interceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Http409Interceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Http424Interceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Http5xxInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpGetUuidInterceptor,
      multi: true
    },
    {
      provide: 'localStorage',
      useValue: window.localStorage
    },
    NgbScrollSpyService
  ]
})
export class SharedCommonModule {
}
