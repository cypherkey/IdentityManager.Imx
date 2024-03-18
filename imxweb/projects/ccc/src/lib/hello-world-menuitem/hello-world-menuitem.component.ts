import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'imx-ccc',
  templateUrl: './hello-world-menuitem.component.html',
  styleUrls: ['./hello-world-menuitem.component.scss']
})
export class HelloWorldMenuitemComponent implements OnInit {

  caption: string = "Hello World"
  actionText: string = ""
  description: string = "Hello World"

  constructor() { }

  ngOnInit(): void {
    console.log("HelloWorldMenuitemComponent -> onInit")
  }

}
