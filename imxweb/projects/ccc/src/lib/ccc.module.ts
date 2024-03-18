import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';
import { TileModule, ClassloggerService, RouteGuardService } from 'qbm';

import { CccService } from './ccc.service';
import { HelloDashboardTileComponent } from './hello-dashboard-tile/hello-dashboard-tile.component';
import { GoodbyeDashboardTileComponent } from './goodbye-dashboard-tile/goodbye-dashboard-tile.component';
import { HelloWorldMenuitemComponent } from './hello-world-menuitem/hello-world-menuitem.component';

const routes: Routes = [
  {
    path: 'helloworld',
    component: HelloWorldMenuitemComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService]
  }
]
@NgModule({
  declarations: [
    HelloDashboardTileComponent,
    GoodbyeDashboardTileComponent,
    HelloWorldMenuitemComponent
  ],
  imports: [
    CommonModule,
    EuiCoreModule,
    EuiMaterialModule,
    RouterModule,
    RouterModule.forChild(routes),
    TileModule
  ],
  exports: [
    HelloDashboardTileComponent,
    GoodbyeDashboardTileComponent,
    HelloWorldMenuitemComponent
  ]
})

export class CccModule { 
  constructor(
    private readonly initializer: CccService,
    logger: ClassloggerService,
  ) {
    logger.info(this, '▶️ CCC loaded');
    console.log('In constructor of CccModule.');
    this.initializer.onInit(routes);
    console.log('CccModule initialized');
  }
}
