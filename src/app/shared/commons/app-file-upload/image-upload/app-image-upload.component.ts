import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2} from '@angular/core';
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IMAGE_UPLOAD_URL, ImageUploadService} from "./image-upload.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoadingService} from "../../loader/loading.service";
import {ValidateService} from "../../services/validate.service";

@Component({
  selector: 'app-image-upload',
  templateUrl: './app-image-upload.component.html',
  styleUrls: ['./app-image-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppImageUploadComponent),
      multi: true
    },
    ImageUploadService
  ],
})
export class AppImageUploadComponent implements ControlValueAccessor, OnInit {

  uploader: FileUploader;
  uploading: boolean = false;
  hasError = false;
  hasBaseDropZoneOver: boolean;
  response: string;
  validates: string[];
  preview: boolean = false;
  onChangeCallBack: (_: any) => void = () => {
  };
  onTouchCallBack: () => void = () => {
  };
  _value: any;

  @Input('id') id: string = 'image';
  @Input('name') name: string = 'image';
  @Input() validateFields: string[] = [];
  @Input('readonly') readonly: boolean = false;
  @Output() uploaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private renderer: Renderer2,
              private service: ImageUploadService,
              private validatorService: ValidateService,
              private modalService: NgbModal,
              private loadingService: LoadingService,
              private ef: ElementRef) {

    this.uploader = new FileUploader({url: IMAGE_UPLOAD_URL});
    this.response = '';
    this.uploader.response.subscribe(res => this.response = res);
    this.uploader.onProgressAll = (progress: any) => {
      this.loadingService.show();
    };

    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {

      this.loadingService.hide();
      this.uploader.clearQueue();

      this.uploading = false;
      this.preview = true;
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

  }

  get value(): any {

    return this._value;
  }

  set value(val: any) {

    this._value = val;
    this.preview = this._value?.upload || false;
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

  fileOverBase(e: any): void {
    this.validates = [];
    this.hasBaseDropZoneOver = e;
    this.uploader.uploadAll();
  }

  reset() {
    this.uploader.clearQueue();
  }

  deleteFile() {

    this.uploading = true;
    this.uploading = false
    this.removed.emit(this.value)
    this.value = undefined;
  }

  clear() {
    this.validates = [];
    this.uploader?.clearQueue();
  }
}
