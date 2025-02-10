import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {LoadingService} from "./loading.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true
})
export class LoadingComponent implements OnInit {
  loading = signal(false);
  destroyRef = inject(DestroyRef)

  constructor(public loadingService: LoadingService) {
  }

  ngOnInit() {
    this.loadingService.loadingState
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.loading.set(value);
      });
  }

}
