import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ClassloggerService, ExtService, MenuService } from 'qbm';

import { HelloDashboardTileComponent } from './hello-dashboard-tile/hello-dashboard-tile.component';
import { GoodbyeDashboardTileComponent } from './goodbye-dashboard-tile/goodbye-dashboard-tile.component';

@Injectable({
  providedIn: 'root'
})
export class CccService {

  constructor(
    private readonly extService: ExtService,
    private readonly router: Router,
    private readonly menuService: MenuService,
    private logger: ClassloggerService,
  ) {
    this.logger.info(this, 'CccService -> constructor');
    this.setupMenu();
  }
  
  public onInit(routes: Route[]): void {
    this.logger.info(this, 'CccService -> onInit');

    // Register the two dashboard tiles
    this.extService.register('Dashboard-SmallTiles', {instance: HelloDashboardTileComponent})
    this.extService.register('Dashboard-SmallTiles', {instance: GoodbyeDashboardTileComponent})

    // Setup the routes
    this.addRoutes(routes);

    this.logger.info(this, 'CccService initialized');
  }

  private addRoutes(routes: Route[]): void {
    const config = this.router.config;
    routes.forEach(route => {
      config.unshift(route);
    });
    this.router.resetConfig(config);
  }

  private setupMenu(): void {
    this.logger.info(this,"Setup menus for HelloWorldMenuitemComponent and SampleIdentitiesMenuitemComponent")
    this.menuService.addMenuFactories((preProps: string[], groups: string[]) => {
   
      // Create a main menu item called Custom and the first entry in that menu is Hello World
      const menu = {
        title: '#LDS#Sample',
        items: [
          {
            title: '#LDS#Hello World',
            route: 'helloworld'
          },
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
