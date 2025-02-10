import {effect, Injectable, signal} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class LoadingService {

  private isLoading = signal(false);
  private _loadingState = new BehaviorSubject(this.isLoading());

  constructor() {
    effect(() => {
      // ลบ {allowSignalWrites: true} ออก
      // effect body ว่างเปล่าอยู่ - อาจพิจารณาว่าจำเป็นต้องมีไหม
    });
  }

  show(): void {
    this.isLoading.set(true);
    this._loadingState.next(this.isLoading());
  }

  hide(): void {
    this.isLoading.set(false);
    this._loadingState.next(this.isLoading());
  }

  get loadingState(): BehaviorSubject<boolean> {
    return this._loadingState;
  }
}
