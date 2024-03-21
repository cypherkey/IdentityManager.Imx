/*
 * Public API Surface of ccc
 */

export { CccService } from './lib/ccc.service';
export { CccModule } from './lib/ccc.module';

/* 
  Entries must be added here or the following error might appear:
    Unsupported private class SomeComponent. This class is visible to consumers via SomeModule -> SomeComponent, but is not exported from the top-level library entrypoint.
    REF: https://stackoverflow.com/questions/60121962/this-class-is-visible-to-consumers-via-somemodule-somecomponent-but-is-not-e
  New components created with following command:
    ng generate component hello-dashboard-tile --project=ccc --style=scss --export --prefix=ccc --skip-tests
    ng generate component goodbye-dashboard-tile --project=ccc --style=scss --export --prefix=ccc --skip-tests
*/
export { HelloDashboardTileComponent } from './lib/hello-dashboard-tile/hello-dashboard-tile.component'
export { GoodbyeDashboardTileComponent } from './lib/goodbye-dashboard-tile/goodbye-dashboard-tile.component'

// ng generate component hello-world-menuitem --project=ccc --style=scss --export --prefix=ccc --skip-tests
export { HelloWorldMenuitemComponent } from './lib/hello-world-menuitem/hello-world-menuitem.component'

// ng generate module sample-identity --project=ccc
// ng generate component sample-identity/sample-identity-datatable --project=ccc --style=scss --export --prefix=ccc --skip-tests
// ng generate component sample-identity/sample-identity-details --project=ccc --style=scss --export --prefix=ccc --skip-tests
// ng generate component sample-identity/sample-identity-tile --project=ccc --style=scss --export --prefix=ccc --skip-tests
export { SampleIdentityModule } from './lib/sample-identity/sample-identity.module'
export { SampleIdentityDatatableComponent } from './lib/sample-identity/sample-identity-datatable/sample-identity-datatable.component'
export { SampleIdentityDetailsComponent } from './lib/sample-identity/sample-identity-details/sample-identity-details.component'
export { SampleIdentityTileComponent } from './lib/sample-identity/sample-identity-tile/sample-identity-tile.component';

// ng generate module icon-list --project=ccc
// ng generate component icon-list/icon-list-page --project=ccc --style=scss --export --prefix=ccc --skip-tests
export { IconListModule } from './lib/icon-list/icon-list.module';
export { IconListPageComponent } from './lib/icon-list/icon-list-page/icon-list-page.component';