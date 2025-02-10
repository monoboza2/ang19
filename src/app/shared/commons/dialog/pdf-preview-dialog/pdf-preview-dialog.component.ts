import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "../../loader/loading.service";

@Component({
  selector: 'app-pdf-preview-dialog',
  templateUrl: './pdf-preview-dialog.component.html',
  styleUrls: ['./pdf-preview-dialog.component.css']
})
export class PdfPreviewDialogComponent<T> implements OnInit {

  @Input() title: string = 'Preview';
  @Input() ref: string
  @Input() previewMode: boolean = false;
  @Input() params: any = {};
  @Input({required: true, alias: 'url'}) url: string;
  innerHTML: any;
  @Output() onSign = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal,
              public loadingService: LoadingService,
              private _domSanitizer: DomSanitizer,
              private _http: HttpClient) {
  }

  ngOnInit() {
    this.srcUrl();
  }

  private srcUrl() {
    this.innerHTML = this._domSanitizer.bypassSecurityTrustHtml(
      `<div style="min-height: 750px; width: 100%;">
          <div style="vertical-align: middle; margin-top: auto; margin-bottom: auto;">
            <span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true" style="vertical-align: middle;"></span>
            <span>กำลังสร้างเอกสาร...</span>
          </div>
        </div>`
    );
    this._http.post(this.url, this.params, {responseType: "blob"})
      .subscribe({
        next: e => {
          let reader = new FileReader();
          reader.readAsDataURL(e);
          reader.onloadend = () => {
            let base64data = reader.result;
            this.innerHTML = this._domSanitizer.bypassSecurityTrustHtml(
              `<object data="${base64data}"
                type='application/pdf'
                class='embed-responsive-item'
                style="min-height: 750px; width: 100%;">
            เกิดข้อผิดพลาดในการโหลดไฟล์
            </object>`
            );
            reader.onerror = (error) => {
              console.log('reader error = ', error);
              this.innerHTML = this._domSanitizer.bypassSecurityTrustHtml(
                `<div style="min-height: 750px; width: 100%;">
              <div style="vertical-align: middle; margin-top: auto; margin-bottom: auto;">
                <div class="text-muted">เกิดข้อผิดพลาดในการสร้างเอกสาร</div>
              </div>
            </div>`);
            }
          }
        },
        error: error => {
          console.log('server error = ', error)
          this.innerHTML = this._domSanitizer.bypassSecurityTrustHtml(`<div style="min-height: 750px; width: 100%;">
          <div style="vertical-align: middle; margin-top: auto; margin-bottom: auto;">
            <strong>เกิดข้อผิดพลาดในการสร้างเอกสาร</strong>
          </div>
        </div>`);
        }
      });
  }

  sign() {
    this.onSign.emit(true);
    this.activeModal.close(true)
  }
}
