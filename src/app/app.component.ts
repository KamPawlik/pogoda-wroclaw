import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Observable, Subject, timer } from 'rxjs';
import { repeatWhen, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Weather } from './models/Weather';
import { WeatherStatus } from './models/WeatherStatus';
import { Timer } from './models/Timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  readonly results$: Observable<Weather>;
  private readonly stop$ = new Subject<void>();
  private readonly start$ = new Subject<void>();

  weatherStatus: WeatherStatus = {
    cityId: 3081368,
    fetched: false,
    isLoading: false,
    error: null
  }
  timer: Timer = {
    time: 300000,
    currentTime: null,
    interval: null
  }
  currentDate: Date;
  timeOfDay: string;

  constructor(private weatherService: WeatherService) {
    this.results$ =  timer(0, this.timer.time).pipe(
        tap(() => this.weatherStatus.isLoading = true),
        switchMap(() => this.weatherService.getWeatherInformation(this.weatherStatus.cityId)),
        takeUntil(this.stop$),
        repeatWhen(() => this.start$),
        shareReplay(1)
      );

      this.results$.subscribe(() => {
        !this.weatherStatus.fetched ? this.weatherStatus.fetched = true : null;
        this.timer.currentTime = this.timer.time;
        this.checkTimeOfDay();
        this.weatherStatus.isLoading = false;
      });

  }

  ngOnInit(): void {
    this.timer.interval = setInterval(() => {
      if(this.timer.currentTime !== null) {
        this.timer.currentTime -= 1000;
        if(this.timer.currentTime == 0) {
          this.timer.currentTime = this.timer.time;
        }
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.stop$.complete();
    this.start$.complete();
    clearInterval(this.timer.interval);
  }

  getWeather() {
    this.stop$.next();
    this.start$.next();
  }

  checkTimeOfDay() {
    this.currentDate = new Date();
    const currentHours = this.currentDate.getHours();
    if(currentHours > 5 && currentHours <= 11) {
      this.timeOfDay = 'morning';
    } else if(currentHours <= 5 || currentHours > 20) {
      this.timeOfDay = 'night';
    } else {
      this.timeOfDay = '';
    }
  }
}
