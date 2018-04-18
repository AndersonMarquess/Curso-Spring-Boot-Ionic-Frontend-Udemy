import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {
     constructor(public http : HttpClient) {}

     //Buscar detalhes do produto
     findById(produto_id : string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`)
     }

     //Mostrar produtos de acordo com a categoria
     findByCategoria(categoria_id : string) {
         return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos?categoria=${categoria_id}`);
     }

     //Não funciona, não criei o bucket para armazenas imagens com valores padronizados, testar com o img.ur ou outro site para hospedar
     getSmallImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, {responseType : 'blob'});
     }
}