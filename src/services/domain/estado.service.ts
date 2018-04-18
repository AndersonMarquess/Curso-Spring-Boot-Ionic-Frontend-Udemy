import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";

//Anotação para permitir a classe de ser injetada
@Injectable()
export class EstadoService {

    constructor(public http: HttpClient) {
    }

    //Faz uma requisição com o get no backend
    findAll(): Observable<EstadoDTO[]> {
        //O uso da crase ` permite colocar variaveis sem precisar concatenar
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}