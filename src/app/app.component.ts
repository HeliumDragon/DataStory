import { Component } from '@angular/core';
import { ChartModule } from 'angular2-highcharts'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    this.options = {
      title : { text : 'simple chart' },
      series: [{
          data: [29.9, 71.5, 106.4, 129.2],
      }]
    };
  }
  title = 'This is a Data Story. Here is the first Chart.';
  options:Object;

}
