import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

  export class WeatherDataService {
    constructor(private http:HttpClient ) { }
    public getData(searchedInput) {
        console.log(searchedInput);
        const url = `http://api.openweathermap.org/data/2.5/weather?&units=metric&appid=1783160b825a3a5d07b3e1c07a495a29&q=${searchedInput}`;
        return this.http.get(url).
        pipe(map((response: any) => response));
    }
    public getForeCastdata(searchedInput) {
        console.log(searchedInput);
        const url = `http://api.openweathermap.org/data/2.5/forecast/daily?&units=metric&appid=1783160b825a3a5d07b3e1c07a495a29&q=${searchedInput}`;
        return this.http.get(url).
        pipe(map((response: any) => response));
    }
    public getHourlyForeCastdata(searchedInput) {
        console.log(searchedInput);
        const url = `http://api.openweathermap.org/data/2.5/forecast?&units=metric&appid=1783160b825a3a5d07b3e1c07a495a29&q=${searchedInput}`;
        return this.http.get(url).
        pipe(map((response: any) => response));
    }
  } 

