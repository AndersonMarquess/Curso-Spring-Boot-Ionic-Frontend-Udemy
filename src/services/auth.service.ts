import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/localUser";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelper : JwtHelper = new JwtHelper();

    constructor(public http : HttpClient, public storage : StorageService) {
    }

    authenticate(creds : CredenciaisDTO) {
       return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
            //Esse observe vai receber o header de resposta
            observe : 'response',
            //Evita o erro de Parse de JSON caso esteja com corpo vazio
            responseType : 'text'

        });
    }

    sucessfulLogin(authorizationValue : string) {
        //Substring padrão, recebe a string a partir o sétimo caractere
        let tok = authorizationValue.substring(7);
        let user : LocalUser = { 
            token: tok, 
            email :  this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {}, {
            //Esse observe vai receber o header de resposta
            observe: 'response',
            //Evita o erro de Parse de JSON caso esteja com corpo vazio
            responseType: 'text'

        });
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}