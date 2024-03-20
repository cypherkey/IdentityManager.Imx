import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';
import { ClassloggerService, RouteGuardService, TileModule } from 'qbm';

import { CccService } from './ccc.service';
import { HelloDashboardTileComponent } from './hello-dashboard-tile/hello-dashboard-tile.component';
import { GoodbyeDashboardTileComponent } from './goodbye-dashboard-tile/goodbye-dashboard-tile.component';
import { HelloWorldMenuitemComponent } from './hello-world-menuitem/hello-world-menuitem.component';
import { SampleIdentityModule } from './sample-identity/sample-identity.module';

const routes: Routes = [
  {
    path: 'helloworld',
    component: HelloWorldMenuitemComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService]
  },
]

@NgModule({
  declarations: [
    HelloDashboardTileComponent,
    GoodbyeDashboardTileComponent,
    HelloWorldMenuitemComponent,
  ],
  imports: [
    CommonModule,
    EuiCoreModule,
    EuiMaterialModule,
    RouterModule,               // Required for CCCService to load HelloWorldMenuitemComponent and SampleIdentitiesMenuitemComponent
    RouterModule.forChild(routes),
    SampleIdentityModule,
    TileModule                  // Required for HelloDashboardTileComponent and GoodbyeDashboardTileComponent
  ],
  exports: [
    HelloDashboardTileComponent,
    GoodbyeDashboardTileComponent,
    HelloWorldMenuitemComponent,
  ]
})

export class CccModule { 
  constructor(
    private readonly initializer: CccService,
    logger: ClassloggerService,
  ) {
    logger.info(this, '▶️ CCC loaded');

    logger.info(this, 'CccModule -> constructor');
    this.initializer.onInit(routes);
    logger.info(this, 'CccModule initialized');
  }
}
