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
            //Push inseri um elemento da lista
            cart.items.push({quantidade : 1, produto : produtoDTO});
            this.storage.setCart(cart);
            return cart;
            
            //Alterado
        }else {
            this.incrementarQuantidade(produtoDTO);
        }
    }

    removeProduto(produtoDTO: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produtoDTO.id);
        if(position != -1) {
            //Splice remove um elemento da lista
            cart.items.splice(position, 1);

            this.storage.setCart(cart);
            return cart;
        }
    }

    incrementarQuantidade(produtoDTO: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produtoDTO.id);
        if(position != -1) {
            cart.items[position].quantidade++;
            this.storage.setCart(cart);
            return cart;
        }
    }

    decrementarQuantidade(produtoDTO: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produtoDTO.id);
        if(position != -1) {
            cart.items[position].quantidade--;
            //Se decrementar ao ponto de ficar negativo ele é removido
            if(cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produtoDTO);
            }

            this.storage.setCart(cart);
            return cart;
        }
    }

    total() : number {
        let cart = this.getCart();
        let soma = 0;
        for(var i = 0; i<cart.items.length; i++) {
            soma += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return soma;
    }
}