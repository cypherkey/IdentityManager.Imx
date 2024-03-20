import { Component, OnInit } from '@angular/core';
import { CollectionLoadParameters, DisplayColumns, EntitySchema, IClientProperty, ValType } from 'imx-qbm-dbts';
import { ClassloggerService, DataSourceToolbarSettings } from 'qbm';
import { QerApiService } from 'qer';

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
