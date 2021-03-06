import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  cloudinaryUrl: string = API_CONFIG.amazonS3BucketBaseUrl + "/products";
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.categoriaService.findAll()
    .subscribe(response => {
      this.items = response;
      loader.dismiss();
    }, error => {
    })
  }

  showProdutos(categoria_id : string){
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});
  }

  presentLoading(){
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }
}
