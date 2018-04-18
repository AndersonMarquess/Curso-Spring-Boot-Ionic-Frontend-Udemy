import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/localUser";

@Injectable()
export class AuthService {

    constructor(public http : HttpClient, public storage : StorageService) {
    }

    authenticate(creds : CredenciaisDTO) {
       return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
            //Esse observe vai receber o header de resposta
            observe : 'response',
            //Evita o erro de Parse de JSON caso esteja com corpo vazio
            responseType : 'text'

        })
    }

    sucessfulLogin(authorizationValue : string) {
        //Substring padrão, recebe a string a partir o sétimo caractere
        let tok = authorizationValue.substring(7);
        let user : LocalUser = { token: tok };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}