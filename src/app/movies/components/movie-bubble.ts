import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { schema, data } from '../../../data/movieBubbleData'
import * as moment from 'moment'
@Component({
  selector: 'ds-movie-bubble',
  template: `
  <mat-card>
    <mat-card-content>
      <div [ds-chart]="options" #bubble style="min-width: 750px;min-height:500px;"></div>
    </mat-card-content>
  </mat-card>
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
      title: {
        show: true, 
        text: 'Top Movies by Genres Scatter (1990-2013)',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#fff',
        }
      },
      backgroundColor: 'rgba(63,81,181, 0.5)',
      color: [
        '#dd4444', '#fec42c', '#80F1BE', 'purple', 'black'
      ],
      legend: {
        y: 60,
        data: ['Drama', 'Action', 'Comedy', 'Adventure', 'Crime'],
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      grid: {
        x: '5%',
        x2: 150,
        y: '15%',
        y2: '10%'
      },
      tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj) {
          var value = obj.value;
          return `
            <div style="font-size:15px; padding-bottom: 7px;margin-bottom: 7px">
              <h1 style="font-size:18px;">${value[5]}:  ${value[1]}</h1>
              <div class="margin-bottom-1em"> 
                <i style="font-size:15px;" class="material-icons">theaters</i> <span>${moment.duration(value[2], 'seconds').humanize()} <span>
                <i style="font-size:15px;" class="material-icons">date_range</i> ${moment(value[4]).format('MMMM Do YYYY')}
              </div>
              <div class="margin-bottom-1em"> ${value[6]} </div>    
              <div class="margin-bottom-1em"> Directed By: ${value[10]} </div>                                                                  
              <div> Acted By: ${value[9]} </div>                            
            </div>
          `
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
        min: 1990,
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
        min: 7,
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
          itemHeight: 320,
          calculable: true,
          precision: 0.1,
          text: ['Radius: time (s)'],
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