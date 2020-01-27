  
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//importar interfaces
import { LoginInterfaz } from '../../interfaces/login';

@Injectable()
export class ServicesProvider {
    insertarUsuario: string = "";
    data: any;
    error: any;
    infoProducts: string = "http://ws4.shareservice.co/TestMobile/rest/GetProductsData ";
    restLogin: string = "http://ws4.shareservice.co/TestMobile/rest/Login";



    constructor(public http: Http) {
        this.data = null;
    }

    /**
     *Consumir servicio de login
     se envia en la interfaz
     user and password
     * @param {LoginInterfaz} logininfo
     * @returns {Promise} 
     */
    postLogin(logininfo: LoginInterfaz) {
        let url = this.restLogin;
        let body = logininfo;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return new Promise
            (
            (resolve, reject) => {
                this.http.post(url, body, options)
                    .map(res => res.json())
                    .subscribe
                    (
                    data => { resolve(data); },
                    error => {
                        reject(error)
                    }
                    )
            }
            );
    }

    /**
     * Consumir servicio que trae los productos
     */
    getProducts() {
        return new Promise
            (
            (resolve, reject) => {
                this.http.get(this.infoProducts)
                    .map(res => res.json())
                    .subscribe
                    (
                    data => { resolve(data); },
                    error => { reject(error); }
                    )
            }
            );
    }





}