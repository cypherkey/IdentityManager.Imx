import { Injectable } from '@angular/core';
import { ClassloggerService } from 'qbm';
import { ExtService } from 'qbm';

@Injectable({
  providedIn: 'root'
})
export class CccService {

  constructor(
    private readonly extService: ExtService,
    private logger: ClassloggerService,
  ) {  }
  
  public onInit(): void {
    this.logger.info(this, 'CccService initialized');
  }
}
