import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassloggerService, DataSourceToolbarModule, DataTableModule } from 'qbm';
import { SampleIdentityDatatableComponent } from './sample-identity-datatable/sample-identity-datatable.component';


@NgModule({
  declarations: [
    SampleIdentityDatatableComponent
  ],
  imports: [
    CommonModule,
    DataSourceToolbarModule,    // Required for SampleIdentitiesMenuitemComponent
    DataTableModule,            // Required for SampleIdentitiesMenuitemComponent
  ],
  exports: [
    SampleIdentityDatatableComponent
  ]
})

export class SampleIdentityModule {
  constructor(
    private logger: ClassloggerService,
  ) {
    this.logger.info(this, 'SampleIdentityModule -> constructor');

  }
}
