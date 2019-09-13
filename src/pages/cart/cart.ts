import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];
  isCartEmpty = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.checkCartEmpty();
    this.loadImageUrls();
  }

  loadImageUrls() {
    for(var i=0; i < this.items.length; i++){
      let item = this.items[i].produto;
      this.produtoService.getSmallImageFromCloudinary(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.cloudinaryBaseUrl}/products/prod${item.id}-small.jpg`;
        }, 
        error => {});
    }
  }

  removeItem(produto : ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).items;
    this.checkCartEmpty();
  }

  increaseQuantity(produto : ProdutoDTO){
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto : ProdutoDTO){
    this.items = this.cartService.decreaseQuantity(produto).items;
    this.checkCartEmpty();
  }

  cartTotal() : number {
    return this.cartService.cartTotal();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout(){
    this.navCtrl.push('PickAddressPage');
  }

  checkCartEmpty(){
    if(this.items.length == 0){
      this.isCartEmpty = true;
    }
  }

}
