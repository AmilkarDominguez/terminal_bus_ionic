import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(
    private env: EnvService,
    private http: HttpClient
  ) { }


  startTravel(code: string,lat: string,lng: string) {
    this.http.post(
      this.env.API_URL + 'start_travel',
      {
        code: code,
        latitud: lat,
        longitud: lng,
      }
    ).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("OK");
      }
    );
  }

  finishTravel(code: string,lat: string,lng: string) {
    this.http.post(
      this.env.API_URL + 'finish_travel',
      {
        code: code,
        latitud: lat,
        longitud: lng,
      }
    ).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        
      },
      () => {
        console.log("OK");
      }
    );
  }
}
