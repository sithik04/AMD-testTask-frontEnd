import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  plotGraph: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) { }

  getWeather(data: any) {
   return this.http.get(`${environment.endPoint}/getWeather?city=${data.city}`)
  }

  sentsms(data: any) {
    return this.http.post(`${environment.endPoint}/sendSms`, data)
  }
}
