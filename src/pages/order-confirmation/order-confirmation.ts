import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
    public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.getEnderecoFromCliente(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      }, error => {
        this.showAlert('Falha ao buscar os dados do Cliente / Pedido. Realize o login novamente.')
        this.navCtrl.setRoot('HomePage');
      })
  }

  private getEnderecoFromCliente(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(element => id == element.id);
    return list[position];
  }

  showAlert(message: string) : Promise<any>{
    let alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: message,
      buttons: [{text: 'OK', role: 'cancel'}]
    });
    return alert.present();
  }

  getOrderTotal(){
    return this.cartService.cartTotal();
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'));
      }, error => {
        if(error.status == 403){
          this.showAlert('Falha ao salvar o pedido. Realize o login novamente.')
          this.navCtrl.setRoot('HomePage');
        }
      })
  }

}
