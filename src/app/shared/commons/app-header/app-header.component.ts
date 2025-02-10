import {Component, OnInit} from '@angular/core';
import {AppBreadcrumbService} from "./app-breadcrumb.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

    public breadcrumbs: Observable<any[]> | undefined;

    constructor(private appBreadcrumbService: AppBreadcrumbService) {
    }

    ngOnInit(): void {
        this.breadcrumbs = this.appBreadcrumbService.breadcrumbs;
    }
}
