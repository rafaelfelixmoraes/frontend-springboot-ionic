import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, MenuController, LoadingController } from 'ionic-angular';
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
    public authService: AuthService,
    private loadingCtrl: LoadingController) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login(){
    this.presentLoading();
    this.authService.authenticate(this.credencials)
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot('CategoriasPage');
      }, error => {
      });
  }

  showAlert(message: string) : Promise<any>{
    let alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: message,
      buttons: [{text: 'OK', role: 'cancel'}]
    });
    return alert.present();
  }

  presentLoading() : Promise<any> {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    return loader.present();
  }

}
