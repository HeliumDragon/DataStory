import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { schema, data } from '../models/movieBubble'

@Component({
  selector: 'ds-movie-bubble',
  template: `
    <div [ds-chart]="options" #bubble style="min-width: 600px;min-height:400px;"></div>
  `,
  styles: [`
  `]
})
export class MovieBubbleComponent implements OnInit {

  constructor() {
  }
  options

  ngOnInit() {
    const dataDrama = data.drama
    const dataAction = data.action
    const dataComedy = data.comedy
    const dataAdventure = data.adventure
    const dataCrime = data.crime
    const itemStyle = {
      normal: {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    };
    this.options = {
      backgroundColor: '#404a59',
      color: [
        '#dd4444', '#fec42c', '#80F1BE', 'purple', 'black'
      ],
      legend: {
        y: 'top',
        data: ['Drama', 'Action', 'Comedy', 'Adventure', 'Crime'],
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      grid: {
        x: '10%',
        x2: 150,
        y: '18%',
        y2: '10%'
      },
      tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj) {
          var value = obj.value;
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
            + value[5]
            + '</div>'
            + value[7]
            + schema[1].text + '：' + value[1] + '<br>'
            + schema[2].text + '：' + value[2] + '<br>'
            + schema[3].text + '：' + value[3] + '<br>'
            + schema[4].text + '：' + value[4] + '<br>'
            + schema[5].text + '：' + value[5] + '<br>'
            + schema[6].text + '：' + value[6] + '<br>';
        }
      },
      xAxis: {
        type: 'value',
        name: 'year',
        nameGap: 16,
        nameTextStyle: {
          color: '#fff',
          fontSize: 14
        },
        min: 1964,
        max: 2014,
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'rating',
        nameLocation: 'end',
        nameGap: 20,
        min: 6.8,
        max: 10,
        nameTextStyle: {
          color: '#fff',
          fontSize: 16
        },
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        },
        splitLine: {
          show: false
        }
      },
      visualMap: [
        {
          left: 'right',
          top: '10%',
          dimension: 2,
          min: 3500,
          max: 12000,
          itemWidth: 30,
          itemHeight: 120,
          calculable: true,
          precision: 0.1,
          text: ['Bubble Size：running time'],
          textGap: 30,
          textStyle: {
            color: '#fff'
          },
          inRange: {
            symbolSize: [10, 70]
          },
          outOfRange: {
            symbolSize: [10, 70],
            color: ['rgba(255,255,255,.2)']
          },
          controller: {
            inRange: {
              color: ['#c23531']
            },
            outOfRange: {
              color: ['#444']
            }
          }
        }
      ],
      series: [
        {
          name: 'Drama',
          type: 'scatter',
          itemStyle: itemStyle,
          data: dataDrama
        },
        {
          name: 'Action',
          type: 'scatter',
          itemStyle: itemStyle,
          data: dataAction
        },
        {
          name: 'Comedy',
          type: 'scatter',
          itemStyle: itemStyle,
          data: dataComedy
        },
        {
          name: 'Adventure',
          type: 'scatter',
          itemStyle: itemStyle,
          data: dataAdventure
        },
        {
          name: 'Crime',
          type: 'scatter',
          itemStyle: itemStyle,
          data: dataCrime
        }
      ]
    };
  }

  ngOnDestroy() { }

}