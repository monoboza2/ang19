import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: '500.component.html'
})
export class P500Component {

  constructor(private router: Router) { }

  redirect() {
    this.router.navigate(['login']);
  }

}
