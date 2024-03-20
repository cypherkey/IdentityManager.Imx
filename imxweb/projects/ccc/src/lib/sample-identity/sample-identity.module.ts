import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Router, Routes } from '@angular/router';
import { ClassloggerService, DataSourceToolbarModule, DataTableModule, MenuService, RouteGuardService } from 'qbm';
import { SampleIdentityDatatableComponent } from './sample-identity-datatable/sample-identity-datatable.component';

const routes: Routes = [
  {
    path: 'sampleidentities',
    component: SampleIdentityDatatableComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService]
  },
]

@NgModule({
  declarations: [
    SampleIdentityDatatableComponent
  ],
  imports: [
    CommonModule,
    DataSourceToolbarModule,    // Required for SampleIdentitiesMenuitemComponent
    DataTableModule,            // Required for SampleIdentitiesMenuitemComponent
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    SampleIdentityDatatableComponent
  ]
})

export class SampleIdentityModule {
  // The constructor is called when this is imported in ccc.module.ts in the imports section of @NgModule
  constructor(
    private logger: ClassloggerService,
    private readonly router: Router,
    private readonly menuService: MenuService,
  ) {
    this.logger.info(this, 'SampleIdentityModule -> constructor');
    this.addRoutes(routes);
    this.setupMenu();
  }

  private addRoutes(routes: Route[]): void {
    const config = this.router.config;
    routes.forEach(route => {
      config.unshift(route);
    });
    this.router.resetConfig(config);
  }

  private setupMenu(): void {
    this.logger.info(this,"Setup menus for SampleIdentitiesMenuitemComponent")
    this.menuService.addMenuFactories((preProps: string[], groups: string[]) => {
   
      // Create a main menu item called Custom and the first entry in that menu is Hello World
      const menu = {
        id: 'ROOT_Sample',
        title: '#LDS#Sample',
        items: [
          {
            title: '#LDS#Sample Identities',
            route: 'sampleidentities'
          },
        ]
      };

      return menu;
    });
  }
}
