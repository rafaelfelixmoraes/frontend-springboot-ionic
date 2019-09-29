import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        // Buscar no Cloudinary a imagem do cliente
        this.getImageIfExists();
      }, 
      error => {
        if(error.status == 403){
          this.showAlert('Sessão expirada. Realize o login novamente');
          this.navCtrl.setRoot('HomePage');
        }
      });
    } else {
      this.showAlert('Ocorreu um erro inesperado. Realize o login novamente');
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromCloudinary(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.cloudinaryBaseUrl}/profiles/cp${this.cliente.id}.jpg`;
    },
    error => {});
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
