import { Component, SecurityContext } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  profileImage;
  cameraOn: boolean = false;;
  private defaultImage = 'assets/imgs/avatar-blank.png';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
    public camera : Camera,
    public sanitizer : DomSanitizer) {

      this.profileImage = this.defaultImage;
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
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
      this.cliente.imageUrl = `${API_CONFIG.amazonS3BucketBaseUrl}/profiles/cp${this.cliente.id}.jpg`;
      this.blobToDataURL(response).then(dataUrl => {
        let imageStr : string = dataUrl as string;
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(imageStr);
      })
    },
    error => {
      this.profileImage = this.defaultImage;
    });
  }

  blobToDataURL(blob : Blob){
    return new Promise((fullfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fullfill(reader.result);
      reader.readAsDataURL(blob);
    })
  }

  showAlert(message: string) : Promise<any>{
    let alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: message,
      buttons: [{text: 'OK', role: 'cancel'}]
    });
    return alert.present();
  }

  getCameraPicture(){
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  getGalleryPicture(){
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.getImageIfExists();
      }, error => {
      })
  }

  cancelPicture(){
    this.picture = null;
  }

}
