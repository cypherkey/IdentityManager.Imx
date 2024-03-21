import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassloggerService } from 'qbm';

@Component({
  selector: 'imx-ccc',
  templateUrl: './sample-identity-tile.component.html',
  styleUrls: ['./sample-identity-tile.component.scss']
})
export class SampleIdentityTileComponent implements OnInit {

  caption: string = "Identity List"
  actionText: string = ""
  description: string = "Provide a list of all identities"

  constructor(
    private logger: ClassloggerService,
    private readonly router: Router
  ) { 
    this.logger.info(this, 'SampleIdentityTileComponent -> constructor');
  }

  ngOnInit(): void {
  }

  public GoToIdentities(): void {
    this.router.navigate(['sampleidentities']);
  }
}
