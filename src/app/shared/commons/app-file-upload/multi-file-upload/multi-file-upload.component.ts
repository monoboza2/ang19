import {Component, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {FileUpload} from "../../../../generated-model/model";
import {ValidateService} from "../../../services/validate.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoadingService} from "../../loader/loading.service";
import {MultiFileUploadService, UPLOAD_URL} from "./multi-file-upload.service";
import {IgnoreNullHttpParams} from "../../Ignore-null-http-params";
import {HumanReadableUnitUtils} from "../../human-readable-unit-utils";

@Component({
  selector: 'app-multi-file-upload',
  templateUrl: './multi-file-upload.component.html',
  styleUrls: ['./multi-file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiFileUploadComponent),
      multi: true
    },
    MultiFileUploadService
  ],
})
export class MultiFileUploadComponent implements ControlValueAccessor, OnInit {

  uploader: FileUploader;
  uploading: boolean = false;
  response: string;
  validates: string[];
  onChangeCallBack: (_: any) => void = () => {
  };
  onTouchCallBack: () => void = () => {
  };
  _value: FileUpload[];
  file: FileUpload;
  @Input('id') id: string = 'file';
  @Input('name') name: string = 'file';
  @Input('readonly') readonly: boolean = false;
  @Output() uploaded: EventEmitter<FileUpload[]> = new EventEmitter<FileUpload[]>();
  @Output() removed: EventEmitter<FileUpload[]> = new EventEmitter<FileUpload[]>();

  constructor(private renderer: Renderer2,
              private service: MultiFileUploadService,
              private validatorService: ValidateService,
              private modalService: NgbModal,
              private loadingService: LoadingService) {

    this.uploader = new FileUploader({url: UPLOAD_URL});
    this.response = '';
    this.uploader.response.subscribe(res => this.response = res);
    this.uploader.onProgressAll = (progress: any) => {
      this.loadingService.show();
    };

    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.loadingService.hide();
      this.uploader.clearQueue();

      this.uploading = false;
      let result = {...this.file, ...JSON.parse(response || "{}")};
      this.file = undefined;
      this.value.push(result);
      this.value = [...this.value];
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

  }

  get value(): FileUpload[] {
    return this._value;
  }

  set value(val: FileUpload[]) {

    this._value = val;
    this.onChangeCallBack(val);
    this.onTouchCallBack();
  }

  ngOnInit(): void {

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

  preview(item: FileUpload) {
    if (!(item.state == 'TEMP')) {
      window.open(`${UPLOAD_URL}/${item.uuid}/preview`, '_blank');
    } else {
      let params = new IgnoreNullHttpParams()
        .set("path", item.path)
        .set("fileName", item.fileName)
        .set("contentType", item.mime);
      window.open(`${UPLOAD_URL}/preview?${params.toHttpParam()}`, '_blank');
    }
  }

  remove(idx: number, item: FileUpload) {
    this.value.splice(idx, 1);
  }

  // edit(idx: number, item: FileUpload) {
  //   // this.
  // }

  fileSize(item: FileUpload): string {
    return HumanReadableUnitUtils.readableBytes(item.size || 0)
  }
}
