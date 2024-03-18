import { NgModule } from '@angular/core';
import { TileModule, ClassloggerService } from 'qbm';

import { CccService } from './ccc.service';
import { HelloDashboardTileComponent } from './hello-dashboard-tile/hello-dashboard-tile.component';
import { GoodbyeDashboardTileComponent } from './goodbye-dashboard-tile/goodbye-dashboard-tile.component';


@NgModule({
  declarations: [
    HelloDashboardTileComponent,
    GoodbyeDashboardTileComponent
  ],
  imports: [
    TileModule
  ],
  exports: [
    HelloDashboardTileComponent,
    GoodbyeDashboardTileComponent
  ]
})

export class CccModule { 
  constructor(
    private readonly initializer: CccService,
    logger: ClassloggerService,
  ) {
    logger.info(this, '▶️ CCC loaded');
    console.log('In constructor of CccModule.');
    this.initializer.onInit();
    console.log('CccModule initialized');
  }
}
