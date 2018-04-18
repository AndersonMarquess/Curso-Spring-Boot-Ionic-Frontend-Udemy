import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {


    constructor(public storage : StorageService) {}

    createOrClearCart() : Cart {
        let cart : Cart = {items : []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        //Retorna o carrinho de compras já existente no storage ou um novo carrinho
        let cart : Cart = this.storage.getCart();
        if(cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produtoDTO: ProdutoDTO) : Cart {
        let cart = this.getCart();
        //Procura nos itens do carrinho o item do argumento e caso o mesmo seja localizado então sua posição é retornada.
        let position = cart.items.findIndex(x => x.produto.id == produtoDTO.id);
        if(position == -1) {
            //Push inseri um elemento na lista
            cart.items.push({quantidade : 1, produto : produtoDTO});
        }

        this.storage.setCart(cart);
        return cart;
    }
}