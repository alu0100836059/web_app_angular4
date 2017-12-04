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

    getProducto(){
        return this._http.get(this.url + 'productos')
            .map(res => res.json());        
    }
}