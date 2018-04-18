import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";

//Anotação para permitir a classe de ser injetada
@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {
    }

    //Faz uma requisição com o get no backend
    findAll(estado_id : string): Observable<CidadeDTO[]> {
        //O uso da crase ` permite colocar variaveis sem precisar concatenar
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}