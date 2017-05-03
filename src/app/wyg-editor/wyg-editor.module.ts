
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WygEditorComponent } from './wyg-editor.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WygEditorComponent
  ],
  exports: [
    WygEditorComponent,
  ]
})
export class WygEditorModule { }