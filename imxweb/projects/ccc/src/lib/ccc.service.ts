import { Injectable } from '@angular/core';
import { ExtService } from 'qbm';

import { CccComponent } from './ccc.component';

@Injectable({
  providedIn: 'root'
})
export class CccService {

  constructor(
    private readonly extService: ExtService
  ) {  }
  
  public onInit(): void{    
	this.extService.register('Dashboard-SmallTiles', {instance: CccComponent})
  }
}
