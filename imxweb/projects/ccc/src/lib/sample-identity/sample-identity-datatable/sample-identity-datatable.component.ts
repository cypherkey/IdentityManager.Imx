import { Component, OnInit } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { EuiLoadingService, EuiSidesheetService } from '@elemental-ui/core';
import { PortalPersonAll, PortalPersonUid } from 'imx-api-qer';
import { CollectionLoadParameters, DisplayColumns, EntitySchema, IClientProperty, ValType } from 'imx-qbm-dbts';
import { ClassloggerService, DataSourceToolbarSettings } from 'qbm';
import { QerApiService } from 'qer';
import { SampleIdentityDetailsComponent } from '../sample-identity-details/sample-identity-details.component';


/*
  Following exmaples from:
  * https://github.com/cypherkey/IdentityManager.Imx/tree/v92/sdk_samples/03_using_data_tables
  * https://www.youtube.com/watch?v=zSSpul8Ez6g&list=PL242czeZwlAmhFqcLZP6KwlUiro6YWdI9
  Good exmaple to get more source code is qer\src\lib\request-history\request-table.component

  CSS uses flexbox. See https://css-tricks.com/snippets/css/a-guide-to-flexbox
*/


@Component({
  selector: 'imx-ccc',
  templateUrl: './sample-identity-datatable.component.html',
  styleUrls: ['./sample-identity-datatable.component.scss']
})
export class SampleIdentityDatatableComponent implements OnInit {

  public dstSettings: DataSourceToolbarSettings;
  public readonly schema: EntitySchema;
  public readonly DisplayColumns = DisplayColumns;
  public navigationState: CollectionLoadParameters = { PageSize: 20 };

  private displayedColumns: IClientProperty[] = [];

  constructor(
    private readonly qerApiClient: QerApiService,
    private logger: ClassloggerService,
    private readonly busyService: EuiLoadingService,
    private readonly sideSheet: EuiSidesheetService
  ) {
    this.logger.info(this, 'SampleIdentityDatatableComponent -> constructor');

    this.schema = this.qerApiClient.typedClient.PortalPersonAll.GetSchema();
    this.displayedColumns = [
      this.schema.Columns[DisplayColumns.DISPLAY_PROPERTYNAME],
      this.schema.Columns.DefaultEmailAddress,
      {
        ColumnName: 'viewDetailsButton',
        Type: ValType.String
      }
    ];
  }

  public async ngOnInit(): Promise<void> {
    await this.navigate();
  }

  public async onIdentitySelected(identity: PortalPersonAll): Promise<any> {
    // API call can take time. Bring up a "busy indicator".
    let overlay: OverlayRef = this.busyService.show();
    let response: PortalPersonUid;

    try {
      response = ( await this.qerApiClient.typedClient.PortalPersonUid.Get(identity.GetEntity().GetKeys()[0]) ).Data[0];
    } finally {
      // API call is done. Hide the busy indicator.
      this.busyService.hide(overlay);
    }
    
    this.logger.info(this, 'Opening sidesheet');
    this.sideSheet.open(SampleIdentityDetailsComponent, {
      title: 'View Details',
      headerColour: 'iris-blue',
      padding: '0',
      width: '600px',
      data: response
    })
  }

  public async onNavigationStateChanged(newState?: CollectionLoadParameters): Promise<void> {
    if (newState) {
      this.navigationState = newState;
    }
    await this.navigate();
  }

  private async navigate(): Promise<void> {
    const data = await this.qerApiClient.typedClient.PortalPersonAll.Get(this.navigationState);

    this.dstSettings = {
      displayedColumns: this.displayedColumns,
      dataSource: data,
      entitySchema: this.schema,
      navigationState: this.navigationState,
    };
  }

  public async onSearch(keywords: string): Promise<void> {
    this.navigationState.StartIndex = 0;
    this.navigationState.search = keywords;
    await this.navigate();
  }
}
