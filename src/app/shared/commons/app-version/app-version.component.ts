import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {Subscription, timer} from "rxjs";
import {switchMap} from "rxjs/operators";
import {IGNORE_400_ERROR} from "../interceptor/http400-interceptor";
import {IGNORE_5XX_ERROR} from "../interceptor/http5xx-interceptor";
// import {browserRefresh} from "../../../app.component";
import {environment} from "../../../../environments/environment";
import {IGNORE_LOADING} from "../../../interceptors/loading_interceptor";

type Version = {
  build: {
    version: string,
    datetime: string,
    time: string,
    name: string
  }
}

@Component({
  selector: 'app-version',
  templateUrl: './app-version.component.html',
  styleUrls: ['./app-version.component.scss']
})
export class AppVersionComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  alert: boolean = false;
  refreshState: boolean = true;
  newVersion: string;
  buildVersion: Version;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    console.log('polling app version...');
    // localStorage.setItem("versionInfo", '{"build":{"version":"2.1.18-SNAPSHOT","artifact":"authencode","datetime":"2022-03-15T07:39:57Z","name":"authencode","time":"2022-03-15T14:39:57","group":"th.co.geniustree.nhso"}}');
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe()
    }
    this.subscription = timer(0, 30000) //every 30 minute
      .pipe(
        switchMap(() => {
          const httpContext = new HttpContext();
          httpContext.set(IGNORE_LOADING, true)
          httpContext.set(IGNORE_400_ERROR, true);
          httpContext.set(IGNORE_5XX_ERROR, true);
          return this.http.get<Version>(`${environment.serverUrl}/actuator/info`);
        })
      )
      .subscribe({
        next: (buildVersion: any) => {
          let versionInfoFromStorage: string = localStorage.getItem(buildVersion?.build?.name)?.['versionInfo'];
          let versionInfo: Version = !!versionInfoFromStorage && !(versionInfoFromStorage == 'undefined') ? JSON.parse(versionInfoFromStorage || "") : '';
          if (!versionInfo) {
            // this.alert = true;
            // do nothing issue and smell fix later then.
          } else if (buildVersion.build?.datetime > versionInfo?.build?.datetime) {
            this.alert = true;
          }
          this.newVersion = buildVersion?.build?.version;
          this.buildVersion = buildVersion;
          //fixme
          // if (browserRefresh && this.refreshState) {
          //   console.log('page refresh.');
          //   this.refreshState = false;
          //   this.setState();
          // }
        }, error: error => {
          console.warn("polling version failed " + error);
        }
      });
  }

  refresh() {

    this.setState();
    window.location.reload();
  }

  setState() {

    this.newVersion = this.buildVersion?.build?.version;
    localStorage.setItem(this.buildVersion?.build?.name, JSON.stringify({versionInfo: this.buildVersion}));
    this.alert = false;
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe()
    }
  }

}
