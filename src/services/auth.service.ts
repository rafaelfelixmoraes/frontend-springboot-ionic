import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper} from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelper : JwtHelper = new JwtHelper();

    constructor(public httpClient: HttpClient, public storageService: StorageService){

    }
    
    authenticate(credencials : CredenciaisDTO){
        return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, credencials, 
        {
            observe : 'response',
            responseType : 'text' 
        });
    }

    successfulLogin(authorizationValue : string){
        let tk = authorizationValue.substring(7);
        let user : LocalUser = {
            token : tk,
            email : this.jwtHelper.decodeToken(tk).sub
        }
        this.storageService.setLocalUser(user);
    }

    logout(){
        this.storageService.setLocalUser(null);
    }
}