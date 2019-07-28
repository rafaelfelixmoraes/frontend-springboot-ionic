import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor(public httpClient: HttpClient, public storage: StorageService){
    }

    findByEmail(email : string) : Observable<ClienteDTO> {
        return this.httpClient.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
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
}