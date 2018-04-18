import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage : StorageService, public alertController : AlertController){}

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
                case 401:
                    this.handle401();
                    break;

                case 403 :
                    this.handle403();
                    break;

                default :
                    this.handleDefaultError(erroObj);
            }   

            return Observable.throw(error);
        }) as any;
    }

    //Limpa o local storage
    handle403() {
        this.storage.setLocalUser(null);
    }

    handle401() {
        let alert = this.alertController.create({
            title: 'Erro 401: Falha de autenticação',
            message: 'Email ou Senha incorretos',
            //Essa parâmetro serve para desabilitar o alert apenas se o botão do mesmo for clicado.
            enableBackdropDismiss : false,
            buttons: [
                { text:'OK' }
            ]
        });
        alert.present();
    }

    handleDefaultError(erroObj) {
        let alert = this.alertController.create({
            title: 'Erro '+erroObj.status+': '+erroObj.error,
            message: erroObj.message,
            //Essa parâmetro serve para desabilitar o alert apenas se o botão do mesmo for clicado.
            enableBackdropDismiss: false,
            buttons: [
                { text: 'OK' }
            ]
        });
        alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true,
};
