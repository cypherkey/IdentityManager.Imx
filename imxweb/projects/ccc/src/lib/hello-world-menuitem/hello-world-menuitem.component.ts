import { Component, OnInit } from '@angular/core';
import { ClassloggerService } from 'qbm';

@Component({
  selector: 'imx-ccc',
  templateUrl: './hello-world-menuitem.component.html',
  styleUrls: ['./hello-world-menuitem.component.scss']
})
export class HelloWorldMenuitemComponent implements OnInit {

  caption: string = "Hello World"
  actionText: string = ""
  description: string = "Hello World"

  constructor(
    private logger: ClassloggerService
  ) { 
    this.logger.info(this, 'HelloWorldMenuitemComponent -> constructor');
  }

  ngOnInit(): void {
    this.logger.info(this, "HelloWorldMenuitemComponent -> onInit");
  }
}
