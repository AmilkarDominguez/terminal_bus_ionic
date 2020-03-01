import { Component, OnInit } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { TravelService } from '../services/travel.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  

  constructor(
    private geolocation: Geolocation, 
    public loadingController: LoadingController, 
    public alertController: AlertController,
    private dataService: TravelService,
  ) {}

 
  ngOnInit() {
    this.getDate();
  }

  code:string;

  myDate: String = new Date().toLocaleString();
  interval_;
  timeLeft: number = 10;
  interval;

  getDate() {
    this.interval_ = setInterval(() => {
      this.myDate = new Date().toLocaleString();
    }, 1000)
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        console.log(this.code);
        this.Strat_Travel();
        this.getLoc();
      }
    }, 1000)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  lat: any = ''
  lng: any = ''


  async getLoc() {
    const loading = await this.loadingController.create({
      message: 'Eviando cordenadas...',
    });
    await loading.present();

    this.geolocation.getCurrentPosition({ maximumAge: 1000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //alert("r succ"+resp.coords.latitude)
      //alert(JSON.stringify( resp.coords));
      loading.dismiss()
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude

      console.log('lat :' + this.lat)
      console.log('lng :' + this.lng)
    }, er => {
      //alert("error getting location")
      loading.dismiss()
      this.showLoader('Can not retrieve Location')
    }).catch((error) => {
      //alert('Error getting location'+JSON.stringify(error));
      loading.dismiss()
      this.showLoader('Error getting location - ' + JSON.stringify(error))
    });

  }


  async showLoader(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  Strat_Travel(){
    this.dataService.startTravel(this.code,this.lat,this.lng);
  }
  Finish_Travel(){
    this.dataService.finishTravel(this.code,this.lat,this.lng);
    clearInterval(this.interval);
  }

}