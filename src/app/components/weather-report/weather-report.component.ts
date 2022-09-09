import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { interval } from 'rxjs';
import { COMMON } from '../../services/constant'
import { take } from 'rxjs/operators';
import { WeatherServiceService } from 'src/app/services/weather-service.service';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {

  //Variable declaration goes here

  public form: FormGroup;
  public invalidCity: boolean = false;
  public invalidMobile: boolean = false;
  public disableCity: boolean = false;
  public disableMobile: boolean = false;
  public showChart: boolean = false;
  public errorMessage: String = "";

  public params: any = {};
  public tableData: any = [];
  public temperature: any = [];
  public timeArray: any = [];
  public chartLabel: string = ""
  public intervalSubscription: any;
  public showButton: boolean = false;
  public allData: any = [];


  constructor(private fb: FormBuilder, private weatherService: WeatherServiceService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      city: ['', Validators.required],
      mobileNumber: ['', Validators.required]
     });

  }

  //While submit the form
  onSubmit() {
    if(!this.form.controls['city'].value  && !this.form.controls['mobileNumber'].value ) {
      this.invalidCity = true;
      this.invalidMobile = true;
      this.showChart = false;
      this.errorMessage = COMMON.MOBILE_NUMBER_TEXT;
      return
    } else if(!this.form.controls['mobileNumber'].value) {
      this.invalidMobile = true;
      this.invalidCity = false;
      this.showChart = false;
      this.errorMessage = COMMON.MOBILE_NUMBER_TEXT;
      return
    } else if(!this.form.controls['city'].value) {
      this.invalidCity = true;
      this.showChart = false;
      this.invalidMobile = false;
      return
    }
    this.invalidCity = false;
    this.invalidMobile = false;
    this.showButton = true
    this.allData = [];
    this.tableData = [];
    this.params = {
      city: this.form.controls['city'].value,
      mobileNumber: this.form.controls['mobileNumber'].value
    }

    //Invoke the weather API
    this.weatherService.getWeather(this.params).subscribe((res: any) => {
      if(res.data.cod === "404") {
       this.invalidCity = true;
       this.showButton = false;
       this.showChart = false;
       } else {
        this.invalidCity = false;
        this.showChart = false;
        this.form.controls['city'].disable();
        this.form.controls['mobileNumber'].disable();
        this.params.temperature = res.data.Temp.temperature;
        this.chartLabel = res.data.Temp.city + COMMON.TEMPERATURE
         var date = new Date();
         this.allData = [...this.allData , {temperature: res.data.Temp.temperature - 273.15, label: res.data.Temp.city + ' Temperature', time: moment(date).format('HH:mm'), start: true}]
        this.weatherService.sentsms(this.params).subscribe((val: any) => {
          this.invalidMobile = false;
            this.invokeMultipleCall();
            this.showChart = true;
            this.form.controls['mobileNumber'].disable();
            this.tableData = [ { name: res.data.Temp.city, createdAt:val.data.createdAt, temperature: res.data.Temp.temperature, smsData: val.data, start: true  }]
   }, err => {
        this.invalidMobile = true;
        this.errorMessage = err.error.error.message;
        this.form.controls['mobileNumber'].enable();
        this.form.controls['city'].enable();
        this.showButton =  false;
        if(err.error.info.code != 400) {
          this.tableData = [ { name: res.data.Temp.city, createdAt:date, temperature: res.data.Temp.temperature, smsData: err.error.error.message  }]
        }
      })
      }
    }, err => {
        this.showButton = false;
        this.form.controls['city'].enable();
        this.form.controls['mobileNumber'].enable();
    })
  }

  //Multiple API calls handled here
  invokeMultipleCall() {
    this.intervalSubscription = interval(60000).pipe(take(9)).subscribe({next:() => {
      this.weatherService.getWeather(this.params).subscribe( (res: any) => {
        var date = new Date();
        this.params.temperature = res.data.Temp.temperature;
        //converting kelvin to degree celcius
        this.allData = [ {temperature: res.data.Temp.temperature - 273.15, label: res.data.Temp.city + COMMON.TEMPERATURE,time: moment(date).format('HH:mm')}]
            this.weatherService.sentsms(this.params).subscribe((val: any) => {
         if(val.info.code === 200) {
          this.showChart = true;
          this.tableData = [ { name: res.data.Temp.city, createdAt:val.data.createdAt, temperature: res.data.Temp.temperature, smsData: val.data  }]

         }
      }, error => {
        this.form.controls['city'].enable()
        this.form.controls['mobileNumber'].enable()
        this.invalidMobile = true;
        this.errorMessage = error.error.error.message
        this.tableData = [ { name: res.data.Temp.city, createdAt:date, temperature: res.data.Temp.temperature, smsData:error.error.error.message   }]
      })
    })
    }, complete: () => {
          this.showButton = false;
          this.form.controls['city'].enable()
          this.form.controls['mobileNumber'].enable()
    }})
}

// To clear the city value
clearCity() {
  this.invalidCity = false;
  this.form.controls['city'].reset();
}

// To clear the mobile number value
clearMobileNumber() {
  this.invalidMobile = false;
  this.form.controls['mobileNumber'].reset();
}
}
