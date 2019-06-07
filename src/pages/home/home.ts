import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credencials: CredenciaisDTO = {
    email : "",
    senha : ""
  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public menu: MenuController) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login(){
    console.log(this.credencials);
    this.navCtrl.setRoot('CategoriasPage')
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: 'Página em construção. Aguarde :)',
      buttons: ['OK']
    });
    alert.present();
  }

}
