import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { GeoLocationDto } from '../models/dto/geolocation.response';
import { WeatherResponseDto } from '../models/dto/weather.response';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  constructor(private readonly httpClient: HttpClient) {}
  private readonly httpOptions = <const>{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response',
    responseType: 'json',
  };
  private fetch<T>(url: string): Observable<T | null> {
    return this.httpClient.get<T>(url, this.httpOptions).pipe(
      map((response) => response.body),
      retry(3),
    );
  }

  public getGeocodingLongLat(
    location: string,
  ): Observable<GeoLocationDto | null> {
    return this.fetch<GeoLocationDto>(
      `/geocode-api/v1/search?name=${location}&count=10&language=pl&format=json`,
    );
  }

  public getWeather(
    long: number,
    lat: number,
  ): Observable<WeatherResponseDto | null> {
    return this.fetch<WeatherResponseDto>(
      `
      /weather-api/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m
      `,
    );
  }
}
