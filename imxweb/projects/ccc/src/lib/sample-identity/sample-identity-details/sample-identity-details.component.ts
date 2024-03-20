import { Component, Inject, OnInit } from '@angular/core';
import { EUI_SIDESHEET_DATA } from '@elemental-ui/core';
import { PortalPersonUid } from 'imx-api-qer';
import { EntitySchema, IEntityColumn } from 'imx-qbm-dbts';
import { ClassloggerService } from 'qbm';
import { ProjectConfigurationService } from 'qer';

@Component({
  selector: 'imx-ccc',
  templateUrl: './sample-identity-details.component.html',
  styleUrls: ['./sample-identity-details.component.scss']
})
export class SampleIdentityDetailsComponent implements OnInit {
  public columns: IEntityColumn[];
  private schema: EntitySchema;

  constructor(
    @Inject(EUI_SIDESHEET_DATA) public readonly data: PortalPersonUid,
    private logger: ClassloggerService,
    private readonly configService: ProjectConfigurationService
  ) { 
    this.schema = data.GetEntity().GetSchema();
  }

  public async ngOnInit(): Promise<void> {
    let personConfig = (await this.configService.getConfig()).PersonConfig;
    let colNames = personConfig.VI_MyData_WhitePages_DetailAttributes;
    this.columns = colNames.filter(colName => this.schema.Columns[colName]).map(colName => this.data.GetEntity().GetColumn(colName))
  }

}
