import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { D3Service } from 'd3-ng2-service';
import { AppComponent } from './app.component';
import { BrushZoomComponent } from './brush-zoom/brush-zoom.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BrushZoomComponent,
    ColumnChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
