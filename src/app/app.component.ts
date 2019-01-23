import { Component ,ElementRef, ViewChild,OnInit} from '@angular/core';
import {WeatherDataService } from './app.component.service';
import {forecastData } from './forecastData';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ WeatherDataService, DatePipe ],
})


export class AppComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  title = 'weatherDashboard';
  public data:any;
  public searchedInput:string;
  public searchSuccess:boolean;
  public icon:any;
  public forecastdata=[];
  public hourlyForeCastdata=[];
  public Chart=[];
  public xAxis=[];

  constructor(public weatherDataService: WeatherDataService,private datePipe: DatePipe) {
    this.data ={ };
  }

  ngOnInit() {
    
  }
  
  public search(){
    this.weatherDataService.getData(this.searchedInput)
    .subscribe(
      result => {
        this.searchSuccess=true;
        //console.log(result);
        this.data=result;
        this.icon="http://openweathermap.org/img/w/"+this.data.weather[0].icon+".png";
        // this.drawChart();
        this.weatherDataService.getHourlyForeCastdata(this.searchedInput)
        .subscribe(
          result =>{
            console.log(result);
            this.hourlyForeCastdata=result.list;
            this.xAxis=this.hourlyForeCastdata.map(el=>{return el.dt_txt});
            this.hourlyForeCastdata=this.hourlyForeCastdata.map(el=>{return el.main.temp});
            console.log(this.hourlyForeCastdata);
            this.drawChart();
          },
          error =>{
            console.log('Error retriving forcast Data!');
          }
        )
        this.weatherDataService.getForeCastdata(this.searchedInput)
        .subscribe(
          result =>{
            console.log(result);
            this.forecastdata=result.list;
            this.forecastdata.shift();
            //console.log(this.forecastdata.shift());
          },
          error =>{
            console.log('Error retriving forcast Data!');
          }
        )
      },
      error =>{
        console.log('Error!');
        this.searchSuccess=false;
      }
    )
  }
  public drawChart(){
    var ctx = document.getElementById("canvas");
    this.Chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.xAxis,
          datasets: [{
              label: 'Temperature in C',
              data: this.hourlyForeCastdata,
              backgroundColor: '#2196F3',
              // borderColor: [
              //     'rgba(255,99,132,1)',
              //     'rgba(54, 162, 235, 1)',
              //     'rgba(255, 206, 86, 1)',
              //     'rgba(75, 192, 192, 1)',
              //     'rgba(153, 102, 255, 1)',
              //     'rgba(255, 159, 64, 1)'
              // ],
              fill: false,
              borderWidth: 1
          }]
      },
      // options: {
      //     scales: {
      //         yAxes: [{
      //             ticks: {
      //                 beginAtZero:true
      //             }
      //         }]
      //     }
      // }
  });
  }
}
