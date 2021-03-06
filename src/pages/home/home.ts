import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

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
    public storageService: StorageService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    if(this.storageService.getLocalUser()){
      this.authService.refreshToken()
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot('CategoriasPage');
      }, error => {
      });
    }
  }

  login(){
    this.authService.authenticate(this.credencials)
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot('CategoriasPage');
      }, error => {
      });
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

  showAlert(message: string) : Promise<any>{
    let alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: message,
      buttons: [{text: 'OK', role: 'cancel'}]
    });
    return alert.present();
  }

}
