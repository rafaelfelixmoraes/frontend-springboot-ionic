import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";

@Injectable()
export class StorageService {

    constructor(public httpClient: HttpClient){

    }

    getLocalUser() : LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if(!user){
            return null;
        } else {
            return JSON.parse(user);
        }
    }

    setLocalUser(obj : LocalUser){
        if(!obj){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
    
}