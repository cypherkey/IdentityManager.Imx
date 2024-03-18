/*
 * Public API Surface of ccc
 */

export * from './lib/ccc.service';
export * from './lib/ccc.module';

/* 
  New components created with following command:
    ng generate component hello-dashboard-tile --project=ccc --style=scss --export --prefix=ccc --skip-tests
    ng generate component goodbye-dashboard-tile --project=ccc --style=scss --export --prefix=ccc --skip-tests
*/
export * from './lib/hello-dashboard-tile/hello-dashboard-tile.component'
export * from './lib/goodbye-dashboard-tile/goodbye-dashboard-tile.component'

// ng generate component hello-world-menuitem --project=ccc --style=scss --export --prefix=ccc --skip-tests
export * from './lib/hello-world-menuitem/hello-world-menuitem.component'