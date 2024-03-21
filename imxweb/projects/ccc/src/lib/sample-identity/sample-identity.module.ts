import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatTabsModule } from '@angular/material/tabs'
import { Route, RouterModule, Router, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CdrModule, ClassloggerService, DataSourceToolbarModule, DataTableModule, ExtService, MenuService, RouteGuardService } from 'qbm';
import { TilesModule } from 'qer';
import { SampleIdentityDatatableComponent } from './sample-identity-datatable/sample-identity-datatable.component';
import { SampleIdentityDetailsComponent } from './sample-identity-details/sample-identity-details.component';
import { SampleIdentityTileComponent } from './sample-identity-tile/sample-identity-tile.component';
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
    SampleIdentityDetailsComponent,
    SampleIdentityTileComponent
  ],
  imports: [
    CdrModule,
    CommonModule,
    DataSourceToolbarModule,    // Required for SampleIdentitiesMenuitemComponent
    DataTableModule,            // Required for SampleIdentitiesMenuitemComponent
    EuiCoreModule,
    EuiMaterialModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    RouterModule,
    RouterModule.forChild(routes),
    TilesModule,
    TranslateModule,
  ],
  exports: [
    SampleIdentityDatatableComponent,
    SampleIdentityDetailsComponent,
    SampleIdentityTileComponent
  ]
})

export class SampleIdentityModule {
  // The constructor is called when this is imported in ccc.module.ts in the imports section of @NgModule
  constructor(
    private logger: ClassloggerService,
    private readonly extService: ExtService,
    private readonly menuService: MenuService,
    private readonly router: Router,
  ) {
    this.logger.info(this, 'SampleIdentityModule -> constructor');
    this.addRoutes(routes);
    this.setupMenu();

    // Setup a icon tile in the middle/medium section to also go to the identities page
    this.extService.register('Dashboard-MediumTiles', {instance: SampleIdentityTileComponent})
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
