import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService{

    constructor(public httpClient: HttpClient){
    }

    findByCategoria(categoria_id : string) {
        return this.httpClient.get(
            `${API_CONFIG.baseUrl}/produtos/page/?categorias=${categoria_id}`);
    }

    getSmallImageFromCloudinary(id : String) : Observable<any>{
        let url = `${API_CONFIG.cloudinaryBaseUrl}/products/prod${id}-small.jpg`;
        return this.httpClient.get(url, {responseType: 'blob'});
    }
}