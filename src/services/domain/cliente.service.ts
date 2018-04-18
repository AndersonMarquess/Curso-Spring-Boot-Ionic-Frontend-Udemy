import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage : StorageService) {}

    findByEmail(email : string) : Observable<ClienteDTO> {

        //Vai buscar as informação através do email, esse endpoint foi definido no backend, o'headers' passa o Bearer para autorização
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    insert(cli : ClienteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
            cli, {
                observe: 'response', 
                responseType:'text'
            }
        );
    }

}