import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  D3Service,
  D3,
  Axis,
  ScaleLinear,
  Selection
} from 'd3-ng2-service';

@Component({
  selector: 'column-chart',
  template:  '  <div class="chart"></div>',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit, OnDestroy {
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  data = [
    {score: 63, subject: 'Mathematics'},
    {score: 82, subject: 'Geography'},
    {score: 74, subject: 'Spelling'},
    {score: 97, subject: 'Reading'},
    {score: 52, subject: 'Science'},
    {score: 74, subject: 'Chemistry'},
    {score: 97, subject: 'Physics'},
    {score: 52, subject: 'ASL'}
  ];
  
  ngOnInit() {
    let d3 = this.d3;
    let margin = { top: 10, right: 20, bottom: 60, left: 30 };
    let width = 900 - margin.left - margin.right;
    let height = 450 - margin.top - margin.bottom;

    let d3ParentElement = d3.select(this.parentNativeElement);
    let d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

    let svg = d3.select('.chart')
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
      
    let yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    let yAxis = d3.axisLeft(yScale);
    svg.call(yAxis);

    let xScale = d3.scaleBand()
      .padding(0.2)
      .domain(this.data.map(d => d.subject))
      .range([0, width]);

    let xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickSize(10)
      .tickPadding(5);

    svg
      .append('g')
        .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

  let rects = svg.selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.subject))
      .attr('y', d => yScale(d.score))
      .attr('width', d => xScale.bandwidth())
      .attr('fill', 'orange')
      .attr('height', d => height - yScale(d.score))
      .on('mouseover', function (d, i) {
        d3.select(this).style('fill','coral')
      });


  }
  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }
  ngOnDestroy() {
    if (this.d3Svg.empty && !this.d3Svg.empty()) {
      this.d3Svg.selectAll('*').remove();
    }
  }


}
