import { Component, OnInit } from '@angular/core';

import { WygEditorComponent } from '../wyg-editor/wyg-editor.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  public testContent: string;

  constructor() { }

  ngOnInit() {
    this.testContent = "<p>Hello world!</p>";
  }

}
