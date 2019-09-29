import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDTO[];
  pedido : PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
    public storage: StorageService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        let cart = this.cartService.getCart();

        this.items = response['enderecos'];
        this.pedido = {
          cliente : {id : response['id']},
          enderecoDeEntrega : null,
          pagamento : null,
          itens : cart.items.map(item => {return {quantidade: item.quantidade, produto: {id: item.produto.id}}})
        }
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

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id};
    console.log(this.pedido);
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
