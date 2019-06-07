import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService {

    constructor(public httpClient: HttpClient){

    }
    
    authenticate(credencials : CredenciaisDTO){
        return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, credencials, 
        {
            observe : 'response',
            responseType : 'text' 
        });
    }
}