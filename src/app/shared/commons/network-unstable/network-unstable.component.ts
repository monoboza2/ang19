import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {fromEvent, merge, Observable, Observer} from "rxjs";
import {map} from "rxjs/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-network-unstable',
  templateUrl: './network-unstable.component.html',
  styleUrls: ['./network-unstable.component.css']
})
export class NetworkUnstableComponent implements OnInit, OnDestroy {

  @ViewChild("container", {static: true})
  private containerRef: ElementRef;
  subscription: Observable<any | boolean>;

  constructor(private _renderer: Renderer2) {
  }

  ngOnInit(): void {

    this.subscription = merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
    this.subscription
      .pipe(takeUntilDestroyed())
      .subscribe(isOnline => {
        console.log('isOnline = ', isOnline);
        let bannerIsShown = this.containerRef.nativeElement.style['display'] == 'block';
        if (!isOnline) {
          if (!bannerIsShown) {
            this._renderer.setStyle(this.containerRef.nativeElement, 'display', 'block');
          }
        } else {
          this._renderer.setStyle(this.containerRef.nativeElement, 'display', 'none');
        }
      });
  }

  ngOnDestroy(): void {

  }

}
