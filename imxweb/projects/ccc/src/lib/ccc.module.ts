import { NgModule } from '@angular/core';
import { TileModule, ClassloggerService } from 'qbm';

import { CccComponent } from './ccc.component';
import { CccService } from './ccc.service';


@NgModule({
  declarations: [
    CccComponent
  ],
  imports: [
    TileModule
  ],
  exports: [
    CccComponent
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
