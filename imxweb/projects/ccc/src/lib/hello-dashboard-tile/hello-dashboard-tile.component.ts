import { Component, OnInit } from '@angular/core';
import { ClassloggerService, imx_SessionService } from 'qbm';
import { RequestsService } from 'qer';

@Component({
  selector: 'imx-ccc',
  templateUrl: './hello-dashboard-tile.component.html',
  styleUrls: ['./hello-dashboard-tile.component.scss']
})
export class HelloDashboardTileComponent implements OnInit {

  caption: string = "Say Hello"
  actionText: string = ""
  description: string = "Say Hello to the logged on user"

  constructor(
    public requestsService: RequestsService,
    public readonly sessionService: imx_SessionService,
    private logger: ClassloggerService
  ) { 
    this.logger.info(this, 'HelloDashboardTileComponent -> constructor');
  }

  async ngOnInit(): Promise<void> {
    console.log("HelloDashboardTileComponent -> onInit")   
    this.actionText = (await this.sessionService.getSessionState()).Username     
  }

  public async doOnClickOperation(): Promise<void> {
    this.requestsService.openSnackbar('Hello ' + this.actionText, '#LDS#Close');
  }
}
