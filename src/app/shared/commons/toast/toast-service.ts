import {Injectable} from '@angular/core';

export interface ToastInfo {
  type?: 'info' | 'success' | 'warning' | 'danger',
  header?: string;
  body?: string;
  delay?: number;
  classname?: string | string[]
}

@Injectable({providedIn: 'root'})
export class ToastService {

  toasts: ToastInfo[] = [];

  show(toast: ToastInfo = {header: 'การแจ้งเตือน', type: 'info'}) {
    this.toasts = [];
    this.toasts.push(toast);
  }

  showInfo(message: string) {
    this.show({header: 'การแจ้งเตือน', type: 'info', classname: 'text-dark', body: message});
  }

  showSuccess(message: string) {
    this.show({
      header: 'การแจ้งเตือน',
      type: 'success',
      classname: 'custom-toast-success',
      body: message,
      delay: 2000
    });
  }

  showWarning(message: string) {
    this.show({
      type: 'warning',
      classname: 'custom-toast-warning',
      body: message
    });
  }

  showDanger() {
    this.show({type: 'danger', classname: 'custom-toast-danger bg-danger text-light', body: 'เกิดข้อผิดพลาด'});
  }

  showDangerWithMessage(message: string) {
    this.show({type: 'danger', classname: 'custom-toast-danger bg-danger text-light', body: message});
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
