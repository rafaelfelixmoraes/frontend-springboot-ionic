import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor(public httpClient: HttpClient, public storage: StorageService){
    }

    findByEmail(email : string) : Observable<ClienteDTO> {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization' : "Bearer ".concat(token)});
        return this.httpClient.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`, 
            {'headers' : authHeader});
    }

    getImageFromCloudinary(id : string) : Observable<any>{
        let imageUrl = `${API_CONFIG.cloudinaryBaseUrl}/profiles/cp${id}.jpg`;
        return this.httpClient.get(imageUrl, {responseType : 'blob'});
    }
}