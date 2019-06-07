import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public menu: MenuController,
    public authService: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login(){
    this.authService.authenticate(this.credencials)
      .subscribe(response => {
        console.log(response.headers.get("Authorization"));
        this.navCtrl.setRoot('CategoriasPage')
      }, error => {});
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
