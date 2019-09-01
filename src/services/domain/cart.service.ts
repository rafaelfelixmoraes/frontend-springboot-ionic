import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService{

    constructor(
        public httpClient: HttpClient,
        public storageService: StorageService){

    }

    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storageService.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storageService.getCart();
        if(!cart){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let prodPosition = cart.items.findIndex(item => item.produto.id == produto.id);
        if(prodPosition == -1){
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storageService.setCart(cart);
        return cart;
    }
    
}