import {effect, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuStageService {

  private menuSignal = signal(this.getInitialMenu());

  constructor() {
    effect(() => {
      localStorage.setItem('currentMenu', this.menuSignal());
    });
  }

  private getInitialMenu(): string {
    return localStorage.getItem('currentMenu') || '';
  }

  setMenu(menu: string) {
    this.menuSignal.set(menu);
  }

  getMenu() {
    return this.menuSignal;
  }

  getStoredMenu(): string {
    return this.menuSignal();
  }

}
