import {Component, HostListener, inject, OnInit, Renderer2, signal, TemplateRef, WritableSignal} from '@angular/core';
import {NgbCollapse, NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgTemplateOutlet} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AppHeaderComponent} from '../../../shared/commons/app-header/app-header.component';
import {ToastsContainer} from '../../../shared/commons/toast/toast-container.component';
import {LoadingComponent} from '../../../shared/commons/loader/loading.component';
import {NavCollapseDirective} from '../../../shared/commons/nav-collapse.directive';

@Component({
    selector: 'app-layout',
    imports: [
        NgTemplateOutlet,
        NgbCollapse,
        FormsModule,
        RouterOutlet,
        AppHeaderComponent,
        ToastsContainer,
        LoadingComponent,
        RouterLink,
        RouterLinkActive,
        NavCollapseDirective
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
    renderer = inject(Renderer2);
    rightSearchCollapsed = false;
    toggleOffCanvas = false;
    isSidebarCollapsed = false;
    selectedFontSize: '14px' | '16px' | '18px' = '14px';
    private offcanvasService = inject(NgbOffcanvas);
    closeResult: WritableSignal<string> = signal('');

    ngOnInit(): void {
        this.toggleOffCanvas = window.innerWidth < 992;
        this.isSidebarCollapsed = window.innerWidth < 992;
    }

    openSidebarOffcanvas(content: TemplateRef<any>) {
        this.offcanvasService.open(content, {ariaLabelledBy: 'offcanvas-basic-title'}).result.then(
            (result) => {
                this.closeResult.set(`Closed with: ${result}`);
            },
            (reason) => {
                this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
            },
        );
    }

    private getDismissReason(reason: any): string {
        switch (reason) {
            case OffcanvasDismissReasons.ESC:
                return 'by pressing ESC';
            case OffcanvasDismissReasons.BACKDROP_CLICK:
                return 'by clicking on the backdrop';
            default:
                return `with: ${reason}`;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        // 1024px is break point of large devices
        console.log('window:resize');
        // this.calculateLayoutRatio();
        // 992px is break point of large devices
        this.toggleOffCanvas = event.target.innerWidth < 992;
        this.isSidebarCollapsed = event.target.innerWidth < 992;
    }

    setFontSizeTo(fontSize: string) {
        this.renderer.setAttribute(document.querySelector('body'), 'data-default-font-size', fontSize);
    }
}
