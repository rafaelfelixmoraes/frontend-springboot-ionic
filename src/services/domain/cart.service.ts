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

    removeProduto(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let prodPosition = cart.items.findIndex(item => item.produto.id == produto.id);
        if(prodPosition != -1){
            cart.items.splice(prodPosition, 1);
        }
        this.storageService.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let prodPosition = cart.items.findIndex(item => item.produto.id == produto.id);
        if(prodPosition != -1){
            cart.items[prodPosition].quantidade++;
        }
        this.storageService.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let prodPosition = cart.items.findIndex(item => item.produto.id == produto.id);
        if(prodPosition != -1){
            cart.items[prodPosition].quantidade--;
            if(cart.items[prodPosition].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }
        this.storageService.setCart(cart);
        return cart;
    }

    cartTotal() : number {
        let cart = this.getCart();
        let sum = 0;
        cart.items.forEach(element => {
            sum += element.produto.preco * element.quantidade;
        });

        return sum;
    }
    
}