import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService{

    constructor(public httpClient: HttpClient){
    }

    findById(produto_id : string){
        return this.httpClient.get<ProdutoDTO>(
            `${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    findByCategoria(categoria_id : string, page : number = 0, linesPerPage : number = 24) {
        return this.httpClient.get(
            `${API_CONFIG.baseUrl}/produtos/page/?categorias=${categoria_id}&pageNumber=${page}&linesPerPage=${linesPerPage}`);
    }

    getImageFromCloudinary(id : String) : Observable<any>{
        let url = `${API_CONFIG.amazonS3BucketBaseUrl}/products/prod${id}.jpg`;
        return this.httpClient.get(url, {responseType: 'blob'});
    }

    getSmallImageFromCloudinary(id : String) : Observable<any>{
        let url = `${API_CONFIG.amazonS3BucketBaseUrl}/products/prod${id}-small.jpg`;
        return this.httpClient.get(url, {responseType: 'blob'});
    }
}