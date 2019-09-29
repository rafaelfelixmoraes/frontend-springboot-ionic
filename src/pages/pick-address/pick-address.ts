import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.items = response['enderecos'];
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

  showAlert(message: string) : Promise<any>{
    let alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: message,
      buttons: [{text: 'OK', role: 'cancel'}]
    });
    return alert.present();
  }

}
