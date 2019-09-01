import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item : ProdutoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.loadImageUrls();
      }, error =>{})
  }

  loadImageUrls() {
    this.produtoService.getImageFromCloudinary(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.cloudinaryBaseUrl}/products/prod${this.item.id}.jpg`;
      }, error => {});
  }

  addToCart(item){
    this.cartService.addProduto(item);
    this.navCtrl.setRoot('CartPage');
  }

}
