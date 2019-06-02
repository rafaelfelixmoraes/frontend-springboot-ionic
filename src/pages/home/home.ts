import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  login(){
    this.navCtrl.setRoot('CategoriasPage')
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: 'Página está em construção. Aguarde :)',
      buttons: ['OK']
    });
    alert.present();
  }

}
