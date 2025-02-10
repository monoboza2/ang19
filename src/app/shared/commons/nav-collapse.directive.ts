import {AfterViewInit, Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[customNavCollapse]',
  standalone: true
})
export class NavCollapseDirective implements OnInit, AfterViewInit {

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    setTimeout(() => {
      let list = this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="collapse"]');
      list.forEach((toggler:any, key:any) => {
        const dataBsTarget = toggler.getAttribute('data-bs-target');
        if (!dataBsTarget) return; // ถ้าไม่มี data-bs-target ให้ข้าม

        const collapsedElement = document.querySelector(dataBsTarget);
        if (!collapsedElement) return; // ถ้าไม่พบ element ให้ข้าม

        let childrenActiveList = document.querySelectorAll(`${dataBsTarget} a.active`);

        if (childrenActiveList.length) {
          // toggler.classList.add('active');
          toggler.classList.add('collapsed');
          collapsedElement.classList.add('show');
          toggler.setAttribute('aria-expanded', 'true');
        } else {
          // toggler.classList.remove('active');
          toggler.classList.remove('collapsed');
          collapsedElement.classList.remove('show')
          toggler.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}
