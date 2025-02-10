import {Routes} from '@angular/router';
import {LayoutComponent} from './pages/secure/layout/layout.component';
import {LandingComponent} from './pages/secure/landing/landing.component';
import {Page1Component} from './pages/secure/page1/page1.component';
import {Page2Component} from './pages/secure/page2/page2.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'secure'
  },
  {
    path: 'secure',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'landing'
      },
      {
        path: 'landing',
        component: LandingComponent,
        data: {title: 'Landing'}
      },
      {
        path: 'page1',
        component: Page1Component,
        data: {title: 'Page1'}
      },
      {
        path: 'page2',
        component: Page2Component,
        data: {title: 'Page2'}
      }
    ]
  }
];
