import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {JsonViewerDialogComponent} from "./json-viewer-dialog/json-viewer-dialog.component";
import {WarningDialogComponent} from "./warning-dialog/warning-dialog.component";
import {NgxJsonViewerModule} from "ngx-json-viewer";
import {TypeChangesDialogComponent} from "./typr-changes-dialog/type-changes-dialog.component";
import {ProgressionDialogComponent} from "./progression-dialog/progression-dialog.component";
import {TextInputDialogComponent} from "./text-input-dialog/text-input-dialog.component";
import {FormsModule} from "@angular/forms";
import {PdfPreviewDialogComponent} from "./pdf-preview-dialog/pdf-preview-dialog.component";


@NgModule({
  declarations: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    JsonViewerDialogComponent,
    WarningDialogComponent,
    TypeChangesDialogComponent,
    ProgressionDialogComponent,
    TextInputDialogComponent,
    PdfPreviewDialogComponent
  ],
  exports: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    JsonViewerDialogComponent,
    WarningDialogComponent,
    TypeChangesDialogComponent,
    ProgressionDialogComponent,
    TextInputDialogComponent,
    PdfPreviewDialogComponent
  ],
  imports: [
    CommonModule,
    NgxJsonViewerModule,
    FormsModule
  ]
})
export class DialogModule {
}
