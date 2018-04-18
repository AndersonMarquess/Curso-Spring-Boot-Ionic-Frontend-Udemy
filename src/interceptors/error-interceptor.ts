import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    intercept(req : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((error, caught) => {
            let erroObj = error;
            console.log("Erro detectado pelo interceptor:")
            if(erroObj.error) {
                erroObj = erroObj.error;
            }
            
            if(!erroObj.status) {
                //Converte para Json
                erroObj = JSON.parse(erroObj);
            }
            
            console.log(erroObj)

            return Observable.throw(error);
        }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true,
};
