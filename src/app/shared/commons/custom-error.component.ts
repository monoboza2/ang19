import {Component, Input} from "@angular/core";

@Component({
  selector: 'custom-error',
  standalone: true,
  template: `
    <span class="ng-invalid-feedback">
      {{error}}
    </span>
  `
})
export class CustomErrorComponent {
  @Input("error") error: string;

  constructor() {
  }
}
