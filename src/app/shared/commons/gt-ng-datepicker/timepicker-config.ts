import {Component} from '@angular/core';
import {NgbTimepickerConfig, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {JsonPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'ngbd-timepicker-config',
  standalone: true,
  imports: [NgbTimepickerModule, FormsModule, JsonPipe],
  templateUrl: './timepicker-config.html',
  providers: [NgbTimepickerConfig],
})
export class NgbdTimepickerConfig {

  constructor(config: NgbTimepickerConfig) {
    config.seconds = true;
    config.spinners = false;
  }
}
