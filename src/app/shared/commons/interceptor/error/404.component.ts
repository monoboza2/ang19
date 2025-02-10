import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: '404.component.html',
  styleUrls: ['./404.component.scss'],
  standalone: true
})
export class P404Component {

  constructor(private router: Router) {
  }

  redirect() {
    this.router.navigate(['/']);
  }
}
