import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, MenuController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public menu: MenuController) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
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
