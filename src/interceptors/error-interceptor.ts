import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage : StorageService){}

    intercept(req : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((error, caught) => {

            let erroObj = error;
            console.log("Erro detectado pelo interceptor:");

            if(erroObj.error) {
                erroObj = erroObj.error;
            }
            
            if(!erroObj.status) {
                //Converte para Json
                erroObj = JSON.parse(erroObj);
            }
            
            console.log(erroObj);

            //Trata os erros de acordo com o tipo
            switch(erroObj.status) {
                case 403 :
                    this.handle403();
                    break;
            }   

            return Observable.throw(error);
        }) as any;
    }

    //Limpa o local storage
    handle403() {
        this.storage.setLocalUser(null);
    }


}

export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true,
};
