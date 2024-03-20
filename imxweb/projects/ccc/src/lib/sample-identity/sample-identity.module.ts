import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatTabsModule } from '@angular/material/tabs'
import { Route, RouterModule, Router, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CdrModule, ClassloggerService, DataSourceToolbarModule, DataTableModule, MenuService, RouteGuardService } from 'qbm';
import { SampleIdentityDatatableComponent } from './sample-identity-datatable/sample-identity-datatable.component';
import { SampleIdentityDetailsComponent } from './sample-identity-details/sample-identity-details.component';
// OrgCharModule is not exported in qer's public_api.ts
// import { OrgChartModule } from '../../../../qer/src/lib/org-chart/org-chart.module';

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
    SampleIdentityDatatableComponent,
    SampleIdentityDetailsComponent
  ],
  imports: [
    CdrModule,
    CommonModule,
    DataSourceToolbarModule,    // Required for SampleIdentitiesMenuitemComponent
    DataTableModule,            // Required for SampleIdentitiesMenuitemComponent
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    RouterModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
  exports: [
    SampleIdentityDatatableComponent,
    SampleIdentityDetailsComponent
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
   
      // Create a main menu item called Sample and the first entry in that menu is Identity
      // NOTE: To add to an existing menu item with the same name, the id property must be specified
      const menu = {
        id: 'ROOT_Sample',
        title: '#LDS#Sample',
        items: [
          {
            title: '#LDS#Identities',
            route: 'sampleidentities'
          },
        ]
      };

      return menu;
    });
  }
}
