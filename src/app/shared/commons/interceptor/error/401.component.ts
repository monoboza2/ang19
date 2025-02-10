import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    templateUrl: '401.component.html',
    styleUrls: ['./401.component.scss']
})
export class P401Component {

    constructor(private router: Router) {
    }

    redirect() {

        this.router.navigate(['login']);
    }
}
