import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";

//Anotação para permitir a classe de ser injetada
@Injectable()
export class CategoriaService{

    constructor(public http : HttpClient) {
    }

    //Faz uma requisição com o get no backend
    findAll() : Observable<CategoriaDTO[]> {
        //O uso da crase ` permite colocar variaveis sem precisar concatenar
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}