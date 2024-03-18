import { Component, OnInit } from '@angular/core';
import { imx_SessionService } from 'qbm';
import { RequestsService } from 'qer';

@Component({
  selector: 'imx-ccc',
  templateUrl: './goodbye-dashboard-tile.component.html',
  styleUrls: ['./goodbye-dashboard-tile.component.scss']
})
export class GoodbyeDashboardTileComponent implements OnInit {

  caption: string = "Say Goodbye"
  actionText: string = ""
  description: string = "Say Goodbye to the logged on user"

  constructor(
    public requestsService: RequestsService,
    public readonly sessionService: imx_SessionService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log("HelloDashboardTileComponent -> onInit")   
    this.actionText = (await this.sessionService.getSessionState()).Username     
  }

  public async doOnClickOperation(): Promise<void> {
    this.requestsService.openSnackbar('Goodbye ' + this.actionText, '#LDS#Close');
  }
}