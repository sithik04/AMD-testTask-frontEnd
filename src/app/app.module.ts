import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { WeatherReportComponent } from './components/weather-report/weather-report.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { OnlyNumber } from './directives/only-number.directive'
import {AlphaOnlyDirective} from './directives/alpha-only.direvtive';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    WeatherReportComponent,
    TableViewComponent,
    OnlyNumber,
    AlphaOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  exports: [OnlyNumber,
    AlphaOnlyDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
