import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService {

    constructor(
        public httpClient: HttpClient, 
        public storage: StorageService,
        public imageUtil: ImageUtilService){
    }

    findByEmail(email : string) {
        return this.httpClient.get(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    findById(id : string) {
        return this.httpClient.get(
            `${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    getImageFromCloudinary(id : string) : Observable<any>{
        let imageUrl = `${API_CONFIG.cloudinaryBaseUrl}/profiles/cp${id}.jpg`;
        return this.httpClient.get(imageUrl, {responseType : 'blob'});
    }

    insertUser(obj : ClienteDTO){
        return this.httpClient.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    uploadPicture(picture){
        let imageBlob = this.imageUtil.dataUriToBlob(picture);
        
        let formData : FormData = new FormData();
        formData.set("file", imageBlob, 'file.png');

        return this.httpClient.post(
            `${API_CONFIG.baseUrl}/clientes/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}