import { Component, OnInit, ElementRef } from '@angular/core';
import { ChartModule } from 'angular2-highcharts'; 
import { D3Service, D3, Selection } from 'd3-ng2-service'; // <-- import the D3 Service, the type alias for the d3 variable and the Selection interface

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference

  constructor(element: ElementRef, d3Service: D3Service){
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.options = {
      title : { text : 'simple chart' },
      series: [{
          data: [29.9, 71.5, 106.4, 129.2],
      }]
    };
  }

  ngOnInit() {
    let d3 = this.d3; // <-- for convenience use a block scope variable
    console.log(d3);
  }

  title = 'This is a Data Story. Here is the first Chart.';
  options:Object;

}
