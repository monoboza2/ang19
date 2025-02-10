import {Component, EventEmitter, forwardRef, inject, input, Input, OnInit, Output, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FileItem, FileUploader, FileUploadModule, ParsedResponseHeaders} from "ng2-file-upload";
import {LoadingService} from "../../loader/loading.service";
import {FileUploadService} from "./file-upload.service";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {ConfirmDialogService} from "../../dialog/confirm-dialog/confirm-dialog.service";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {FileUploadDto, SrmGroupRegisterFile, SrmRegisterFileDto} from "../../../../../generated-model/model";
import {ValidateService} from "../../services/validate.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    },
    FileUploadService
  ],
  imports: [
    CommonModule,
    FileUploadModule
  ],
  standalone: true
})
export class FileUploadComponent implements ControlValueAccessor, OnInit {

  accessToken: string = undefined;
  uploader: FileUploader;
  isUploading = signal(false);
  @Input() size: 'sm-inline' | 'normal' = 'normal';
  touched = false;
  value: FileUploadDto & SrmRegisterFileDto & SrmGroupRegisterFile;
  @Input('id') id: string = 'file';
  @Input('name') name: string = 'file';
  @Input('disabled') disabled: boolean = false;
  fileType = input<string[]>();
  @Output() uploaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() removed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private confirmDialogService: ConfirmDialogService = inject(ConfirmDialogService);
  private oidcSecurityService = inject(OidcSecurityService);
  private loadingService = inject(LoadingService);
  private validateService = inject(ValidateService);
  onChangeCallBack: (_: any) => void = () => {
  };
  onTouchCallBack: () => void = () => {
  };

  constructor() {
  }

  ngOnInit(): void {
    this.oidcSecurityService.getAccessToken()
      .subscribe(accessToken => {
        let maxFileSize = 5 * 1024 * 1024;
        this.accessToken = accessToken;
        this.uploader = new FileUploader(
          {
            authToken: `Bearer ${this.accessToken}`,
            authTokenHeader: 'Authorization',
            url: `${environment.serverUrl}/public/api/minio/upload`,
            allowedFileType: this.fileType(),
            maxFileSize: maxFileSize
          });
        this.uploader.onProgressAll = (progress: any) => {
          this.isUploading.set(true);
          this.loadingService.show();
        };

        this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
          this.isUploading.set(false);
          this.loadingService.hide();
          this.uploader.clearQueue();

          let result = {...this.value, ...JSON.parse(response || "{}")};
          this.writeValue(result);
          this.markAsTouched();
          this.onChangeCallBack(result);
          this.uploaded.emit(result);
        };

        this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
          this.isUploading.set(false);
          this.loadingService.hide()
          if (status == 401) {
            console.log('unauthorized = ', response);
            this.confirmDialogService.open({content: 'session หมดอายุ ต้องการล็อกอินอีกครั้บกด ยืนยัน?'})
              .subscribe(e => {
                if (e) {
                  this.oidcSecurityService.logoff();
                  this.oidcSecurityService.authorize();
                }
              });
          }
          this.uploader.clearQueue();
        };

        this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
          console.log('after adding file = ', fileItem);
          console.log('after adding file = ', this.uploader.queue);
          let currFileItem = this.uploader.queue[this.uploader.queue?.length - 1];
          this.uploader.queue = [currFileItem];
        }

        this.uploader.onCompleteAll = () => {
          this.isUploading.set(false);
          this.loadingService.hide()
        };

        this.uploader.onWhenAddingFileFailed = (item, filter) => {
          let message = '';
          switch (filter.name) {
            case 'fileSize':
              message = 'Warning ! \nThe uploaded file \"' + item.name + '\" is ' + this.formatBytes(item.size) + ', this exceeds the maximum allowed size of ' + this.formatBytes(maxFileSize);
              this.validateService.clientErrors.next({
                field: 'fileSize',
                message: 'ขนาดไฟล์ต้องไม่เกิน 5 MB'
              });
              break;
            default:
              message = 'Error trying to upload file ' + item.name;
              this.validateService.clientErrors.next({field: filter.name, message});
              break;
          }
          // alert(message);
        };
      });
  }

  registerOnChange(fn: any): void {
    this.onChangeCallBack = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchCallBack = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: FileUploadDto & SrmRegisterFileDto & SrmGroupRegisterFile): void {
    this.value = obj;
  }

  upload(event: any) {
    event.target.value = '';
    this.uploader.uploadAll();
  }

  preview() {
    window.open(`${environment.serverUrl}/public/api/minio/download/${this.value.bucket}/${this.value.filename}`, '_blank');
  }

  removeFile() {
    let val = {fileType: this.value.fileType};
    this.writeValue(val);
    this.markAsTouched();
    this.onChangeCallBack(val);
    this.removed.emit(true);
  }

  /**
   * application
   * image
   * video
   * audio
   * pdf
   * compress
   * doc
   * xls
   * ppt
   */
  getAcceptType() {
    if (!this.fileType()) {
      return undefined;
    }
    return (this.fileType() || [])
      .map(e => {
        if (e == 'pdf') {
          return ["application/pdf"];
        }
        if (e == 'image') {
          return ['image/jpeg', 'image/png'];
        }
        if (e == 'zip' || e == 'compress') {
          return [
            "zip",
            "application/octet-stream",
            "application/zip",
            "application/x-zip",
            "application/x-zip-compressed"
          ];
        }
        if (e == 'application' || e == 'mdb') {
          return ['application/msaccess'];
        }
        if (e == 'xls') {
          return ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        }
        return [
          "application/pdf",
          'image/jpeg',
          'image/png',
          "zip",
          "application/octet-stream",
          "application/zip",
          "application/x-zip",
          "application/x-zip-compressed",
          'application/msaccess',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
      })
      .flatMap(e => e);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouchCallBack();
      this.touched = true;
    }
  }

  formatBytes(bytes, decimals?) {
    if (bytes == 0) return '0 Bytes';
    const k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
