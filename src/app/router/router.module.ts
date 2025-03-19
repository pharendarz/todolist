// not used - think later with ssr
import { NgModule } from '@angular/core';
import { NavigationEnd, Route, Router, RouterModule } from '@angular/router';

const ROUTER_DEFINITION: Route[] = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTER_DEFINITION, {})],
  exports: [RouterModule],
})
export class RoutingModule {
  public constructor(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // this.controllersService.generalTabRelatedSpinner.next(true);
        // console.log('ROUTER EVENT:::::', event);
      }
    });
  }
}
