import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import { D3Service } from 'd3-ng2-service';
import { AppComponent } from './app.component';
import { BrushZoomComponent } from './brush-zoom/brush-zoom.component';

@NgModule({
  declarations: [
    AppComponent,
    BrushZoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
