import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];
  page : number = 0;
  checkComplete : boolean = false;
  loader : Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadProducts();
    this.loader = this.presentLoading();
  }

  loadProducts() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let indexStart = this.items.length;
        this.items = this.items.concat(response['content']);
        this.loader.dismiss();
        if(response["last"] == true) {
          this.checkComplete = true;
        }
        let indexEnd = this.items.length - 1;
        this.loadImageUrls(indexStart, indexEnd);
      }, error =>{
        this.loader.dismiss();
      })
  }

  loadImageUrls(indexStart : number, indexEnd : number) {
    for(var i=indexStart; i <= indexEnd; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromCloudinary(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.amazonS3BucketBaseUrl}/products/prod${item.id}-small.jpg`;
        }, 
        error => {});
    }
  }

  showDetail(produto_id : string){
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

  presentLoading(){
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.checkComplete = false;
    this.loadProducts();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadProducts();
    setTimeout(() => {
      infiniteScroll.complete();
      if(this.checkComplete){
        infiniteScroll.enable(false);
      }
    }, 2000);
  }
}
