import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OidcSecurityService, UserDataResult} from "angular-auth-oidc-client";
import {EmailNotifyDialogService} from "./email-notify-dialog.service";
import {ToastService} from "../../toast/toast-service";


@Component({
  selector: 'app-email-notify-dialog',
  templateUrl: './email-notify-dialog.component.html',
  styleUrls: ['./email-notify-dialog.component.scss']
})
export class EmailNotifyDialogComponent implements OnInit {

  user: UserDataResult;
  checkEmail: boolean = false

  constructor(public activeModal: NgbActiveModal,
              private oidcSecurityService: OidcSecurityService,
              private toastService: ToastService,
              private emailNotifyDialogService:EmailNotifyDialogService) {
  }

  ngOnInit(): void {
    this.emailNotifyDialogService.checkEmail().subscribe(e=>{
      this.checkEmail = e
    })

    this.oidcSecurityService.userData$.subscribe(user => {
      this.user = user
    })
  }

  save() {
    this.emailNotifyDialogService.updateCurrentUser(this.checkEmail).subscribe(e=>{
      this.activeModal.close(e)
      this.toastService.showSuccess('บันทึกข้อมูลสำเร็จ')
    })
  }
}
