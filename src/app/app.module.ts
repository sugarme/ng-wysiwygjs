import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { WygEditorModule } from './wyg-editor/wyg-editor.module';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WygEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
