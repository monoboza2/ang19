import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppVersionComponent} from './app-version.component';


@NgModule({
  exports: [
    AppVersionComponent
  ],
  declarations: [
    AppVersionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppVersionModule {

}
