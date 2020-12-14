import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../config/settings';

@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    constructor(private http: HttpClient) {}

    public getWeatherInformation(city: number): Observable<any> {
        return this.http.get(`${env.WEATHER_API}&id=${city}&units=metric`);
    }
}