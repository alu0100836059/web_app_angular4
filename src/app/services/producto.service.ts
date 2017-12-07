import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Producto } from '../models/producto';


@Injectable ()
export class ProductoService{
    public url: string;

    constructor(
        public _http: Http
    ){
        this.url = 'http://localhost:8000/api/'
    }

    getProductos(){
        return this._http.get(this.url + 'productos')
            .map(res => res.json());        
    }

    getProducto(id){
        return this._http.get(this.url + 'productos/' + id)
            .map(res => res.json());
    }

    addProducto(producto: Producto){
        let json = JSON.stringify(producto);
        let url = this.url + 'productos';
        let headers = new Headers({ 'Content-type' : 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.post(url, json, options)
            .map(res => res.json());
    }

    editProducto(id, producto: Producto){
        let json = JSON.stringify(producto);
        let url = this.url + 'productos/' + id;
        let headers = new Headers({ 'Content-type' : 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.put(url, json, options)
            .map(res => res.json());
        }

    deleteProducto(id){
        let url = this.url + 'productos/' + id;
        return this._http.delete(url, )
            .map((res) => res.json());
    }
    makeFileRequest(url: string, file:File){
        return new Promise((resolve, reject) => {
            // Simulamos el formulario
            var formData: any = new FormData();
            formData.append('uploads', file);

            // Comenzamos con ajax
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){ 
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            };

            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
}