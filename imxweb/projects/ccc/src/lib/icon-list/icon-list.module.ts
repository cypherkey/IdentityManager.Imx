import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Router, Routes } from '@angular/router';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';
import { TranslateModule } from '@ngx-translate/core';
import { ClassloggerService, MenuService, RouteGuardService } from 'qbm';
import { IconListPageComponent } from './icon-list-page/icon-list-page.component';

const routes: Routes = [
  {
    path: 'iconlist',
    component: IconListPageComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService]
  },
]

@NgModule({
  declarations: [
    IconListPageComponent
  ],
  imports: [
    CommonModule,
    EuiCoreModule,
    EuiMaterialModule,
    RouterModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
  exports: [
    IconListPageComponent
  ]
})
export class IconListModule {
  // The constructor is called when this is imported in ccc.module.ts in the imports section of @NgModule
  constructor(
    private logger: ClassloggerService,
    private readonly router: Router,
    private readonly menuService: MenuService,
  ) {
    this.logger.info(this, 'IconListModule -> constructor');
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
    this.logger.info(this,"Setup menus for IconListPageComponent")
    this.menuService.addMenuFactories((preProps: string[], groups: string[]) => {
    
      // Create a main menu item called Sample and the first entry in that menu is Identity
      // NOTE: To add to an existing menu item with the same name, the id property must be specified
      const menu = {
        id: 'ROOT_Sample',
        title: '#LDS#Sample',
        items: [
          {
            title: '#LDS#Icon List',
            route: 'iconlist'
          },
        ]
      };

      return menu;
    });
  }
}

