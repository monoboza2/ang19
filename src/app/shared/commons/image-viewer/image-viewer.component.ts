import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-image-viwer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({transform: 'rotateY(180deg)'})),
      state('inactive', style({transform: 'rotateY(0)'})),
      transition('active => inactive', animate('400ms ease-out')),
      transition('inactive => active', animate('400ms ease-in'))
    ]),
    trigger('rotatedState', [
      state('default', style({transform: 'rotate(0)'})),
      state('rotated-90', style({transform: 'rotate(-90deg)'})),
      state('rotated-180', style({transform: 'rotate(-180deg)'})),
      state('rotated-270', style({transform: 'rotate(-270deg)'})),
      state('rotated-360', style({transform: 'rotate(-360deg)'})),
      state('default-flip', style({transform: 'rotate(0) rotateY(180deg)'})),
      state('rotated-90-flip', style({transform: 'rotate(-90deg) rotateY(180deg)'})),
      state('rotated-180-flip', style({transform: 'rotate(-180deg) rotateY(180deg)'})),
      state('rotated-270-flip', style({transform: 'rotate(-270deg) rotateY(180deg)'})),
      state('rotated-360-flip', style({transform: 'rotate(-360deg) rotateY(180deg)'})),
      transition('* => *', animate('400ms ease-in')),

    ])
  ]
})
export class ImageViewerComponent implements OnInit {
  rotateSeq = ['default', 'rotated-90', 'rotated-180', 'rotated-270', 'rotated-360']
  currentRotateSeq = 0
  src: string
  rotated: string = this.rotateSeq[this.currentRotateSeq]
  flip: string = 'inactive';

  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  flipImage() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    if (this.flip == 'active') {
      this.rotated = this.rotated + '-flip'
    } else {
      this.rotated = this.rotateSeq[this.currentRotateSeq % 5]
    }
    console.log(this.rotated)
  }

  rotate() {
    this.rotated = this.rotateSeq[++this.currentRotateSeq % 5]
    if (this.flip == 'active') {
      this.rotated = this.rotated + '-flip'
    }
    console.log(this.rotated)
  }
}
