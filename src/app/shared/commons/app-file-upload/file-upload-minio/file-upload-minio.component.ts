import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm} from "@angular/forms";
import {FileItem, FileUploader, FileUploadModule, ParsedResponseHeaders} from "ng2-file-upload";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {LoadingService} from "../../loader/loading.service";
import {FileResponse} from "../../../../../generated-model/model";
import {CustomErrorComponent} from "../../custom-error.component";
import {NgIf} from "@angular/common";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-file-upload-minio',
  standalone: true,
  imports: [
    CustomErrorComponent,
    NgIf,
    FileUploadModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadMinioComponent),
      multi: true
    }
  ],
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }],
  templateUrl: './file-upload-minio.component.html',
  styleUrl: './file-upload-minio.component.scss'
})
export class FileUploadMinioComponent implements ControlValueAccessor, OnInit {

  accessToken: string = undefined;
  uploader: FileUploader;
  uploading: boolean = false;
  response: string;
  validates: string[];
  @Input() size: 'sm-inline' | 'normal' = 'normal';
  @Input() fileConfigItem: any
  @Input() accept: any
  onChangeCallBack: (_: any) => void = () => {
  };
  onTouchCallBack: () => void = () => {
  };
  _value: any;
  @Input('id') id: string = 'file';
  @Input('name') name: string = 'file';
  @Input() validateFields: string[] = [];
  @Input('disabled') disabled: boolean = false;
  @Input() fileType : string[] = undefined;
  @Output() uploaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private oidcSecurityService: OidcSecurityService,
              private loadingService: LoadingService) {

  }

  get value(): FileResponse {

    return this._value;
  }

  set value(val: FileResponse) {

    this._value = val;
    this.onChangeCallBack(val);
    this.onTouchCallBack();
  }

  ngOnInit(): void {
    this.oidcSecurityService.getAccessToken()
      .subscribe(accessToken => {
        this.accessToken = accessToken;
        this.uploader = new FileUploader(
          {
            authToken: `Bearer ${this.accessToken}`,
            authTokenHeader: 'Authorization',
            url: `${environment.serverUrl}/public/api/minio/upload`,
            allowedFileType: this.fileType
          });
        this.response = '';
        this.uploader.response.subscribe(res => this.response = res);
        this.uploader.onProgressAll = (progress: any) => {
          this.loadingService.show();
        };

        this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {

          this.loadingService.hide();
          this.uploader.clearQueue();

          this.uploading = false;
          let result = {...this._value, ...JSON.parse(response || "{}")};
          this.value = result;
          this.uploaded.emit(result);
        };

        this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {

          this.validates = [];
          if (status == 400 || status == 413) {
            let error = JSON.parse(response);
            console.log('errors resp = ', error);
            if (error?.errors?.length) {
              this.validates = [...error?.errors?.map((e: any) => e.defaultMessage)];
            } else {
              this.validates = [error.error + "-" + error?.message];
            }
            console.log('errors = ', this.validates);
            this.uploader.clearQueue();
          }
          this.loadingService.hide()
        };

        this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
          console.log('after adding file = ', fileItem);
          console.log('after adding file = ', this.uploader.queue);
          let currFileItem = this.uploader.queue[this.uploader.queue?.length - 1];
          this.uploader.queue = [currFileItem];
        }

        this.uploader.onCompleteAll = () => {

          this.loadingService.hide()
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

  writeValue(obj: any): void {
    this.value = obj;
  }

  upload(event: any) {
    event.target.value = '';
    this.validates = [];
    this.uploader.uploadAll();
  }

  reset() {
    this.uploader.clearQueue();
  }

  clear() {
    this.validates = [];
    this.uploader?.clearQueue();
  }

  isUploading() {
    return !!this.uploading;
  }

  download() {
    window.open(`${environment.serverUrl}/public/api/minio/download/${this.value.bucket}/${this.value.filename}`, '_blank');
  }

  removeFile() {
    this.value = undefined;
  }
}
