import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {IgnoreNullHttpParams} from "../Ignore-null-http-params";
import {ConsiderDocument} from "../../../../generated-model/model";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-pdf-dialog',
  templateUrl: './pdf-dialog.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./pdf-dialog.component.css']
})
export class PdfDialogComponent implements OnInit {

  @Input()
  file: ConsiderDocument;

  innerHTML: any;

  constructor(public modal: NgbActiveModal,
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
            <span>กำลังโหลดไฟล์...</span>
          </div>
        </div>`
    );

    const param = IgnoreNullHttpParams.fromObject(this.file).toHttpParam()

    let url;
    if (this.file.useRemoteStorage) {
      url = `public/api/minio/download/srm/` + this.file.fileName;
    } else {
      url = `public/api/consider-document/download/` + this.file.id;
    }
    this._http.get(url, {params: param, responseType: "blob"})
      .subscribe(e => {
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
                    </object>`);
          reader.onerror = (error) => {

            console.log('reader error = ', error);
            this.innerHTML = this._domSanitizer.bypassSecurityTrustHtml(
              `<div style="min-height: 750px; width: 100%;">
              <div style="vertical-align: middle; margin-top: auto; margin-bottom: auto;">
                <strong>เกิดข้อผิดพลาดในการสร้างเอกสาร</strong>
              </div>
            </div>`);
          }
        }
      }, error => {
        console.log('server error = ', error)
        this.innerHTML = this._domSanitizer.bypassSecurityTrustHtml(`<div style="min-height: 750px; width: 100%;">
          <div style="vertical-align: middle; margin-top: auto; margin-bottom: auto;">
            <strong>เกิดข้อผิดพลาดในการสร้างเอกสาร</strong>
          </div>
        </div>`);
      });
  }
}
