import { Injectable } from '@angular/core';
import { ClassloggerService } from 'qbm';
import { ExtService } from 'qbm';

import { HelloDashboardTileComponent } from './hello-dashboard-tile/hello-dashboard-tile.component';
import { GoodbyeDashboardTileComponent } from './goodbye-dashboard-tile/goodbye-dashboard-tile.component';

@Injectable({
  providedIn: 'root'
})
export class CccService {

  constructor(
    private readonly extService: ExtService,
    private logger: ClassloggerService,
  ) {  }
  
  public onInit(): void {
    this.extService.register('Dashboard-SmallTiles', {instance: HelloDashboardTileComponent})
    this.extService.register('Dashboard-SmallTiles', {instance: GoodbyeDashboardTileComponent})
    this.logger.info(this, 'CccService initialized');
  }
}
