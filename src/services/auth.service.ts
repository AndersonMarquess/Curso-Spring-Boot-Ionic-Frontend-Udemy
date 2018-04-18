import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService {

    constructor(public http : HttpClient) {
    }

    authenticate(creds : CredenciaisDTO) {
       return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
            //Esse observe vai receber o header de resposta
            observe : 'response',
            //Evita o erro de Parse de JSON caso esteja com corpo vazio
            responseType : 'text'

        })
    }
}