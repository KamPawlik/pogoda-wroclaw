import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../models/Weather';

@Component({
  selector: 'app-weather-information',
  templateUrl: './weather-information.component.html',
  styleUrls: ['./weather-information.component.scss']
})
export class WeatherInformationComponent implements OnInit {

  @Input() result: Weather;
  @Input() currentDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
