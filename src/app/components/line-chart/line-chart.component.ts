import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js'
import { Color } from 'ng2-charts'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  //Vaiable declaration goes here
  public chartType: string = 'line';
  public lineChartData: any[];
  public lineChartLabels: any[];
  public data = [];
  public temp: any = [];
  public time: any = [];
  public chartOptions: any;
  public lineChartLegend = true
  public lineChartOptions: ChartOptions = {
    responsive: true,
    animation: {
      duration: 0,
    },
    tooltips: {
      callbacks: {
        label: (Item: any) =>
          Item.label + ' - ' + Number(Item.value).toFixed(2) + ' C',
      },
    },
    legend: { display: false },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
        },
      ],
    },
  };

  @Input() allData: any;
  @Input() timeArray: any
  @Input() chartLabel: any
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.allData.length && this.allData[0].start) {
      this.temp = [];
      this.time = [];
    }
    this.allData.forEach((ele: any) => {
      this.temp.push(ele.temperature)
      this.chartLabel = ele.label
      this.time = [...this.time,ele.time]
   })
   this.lineChartData = [{data: this.temp, fill: false, backgroundColor: '#65A0BA', borderColor: '#65A0BA',pointBackgroundColor: '#65A0BA', dataPoints:[{color: '#65A0BA'}]}]
   this.lineChartLabels = [...this.time];

  }

}
