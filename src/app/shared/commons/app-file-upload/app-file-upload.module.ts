import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {AppImageUploadComponent} from "./image-upload/app-image-upload.component";
import {FileUploadModule} from "ng2-file-upload";
import {CustomErrorComponent} from "../custom-error.component";
import {IgnoreFieldsetDisabledDirective} from "../../ignore-fieldset-disabled.directive";


@NgModule({
  declarations: [
    FileUploadComponent,
    AppImageUploadComponent,
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    IgnoreFieldsetDisabledDirective,
    CustomErrorComponent,
  ],
  exports: [
    FileUploadModule,
    FileUploadComponent,
    AppImageUploadComponent,
  ]
})
export class AppFileUploadModule {
}
