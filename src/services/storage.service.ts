import { Injectable } from "@angular/core";
import { LocalUser } from "../models/localUser";
import { STORAGE_KEY } from "../config/storage_keys.config";

@Injectable()
export class StorageService{

    getLocalUser() : LocalUser {
        let user = localStorage.getItem(STORAGE_KEY.localUser);
        if(user == null) {
            return null;
        }else {
            return JSON.parse(user);
        }
    }

    setLocalUser(obj : LocalUser) {
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEY.localUser);
        } else {
            //JSON.stringify(obj) serve para converter o JSON e string
            localStorage.setItem(STORAGE_KEY.localUser, JSON.stringify(obj));
        }
    }

}