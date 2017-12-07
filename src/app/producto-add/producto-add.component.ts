import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css'],
  providers: [ProductoService]
})
export class ProductoAddComponent implements OnInit {
  public titulo: string;
  public producto: Producto;
  public url: string;
  public filesToUpload;
  public resultToUpload;
  public nameImag;

  constructor(
      private _productoService: ProductoService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { 
    this.titulo = 'Crear un nuevo producto';
    this.producto = new Producto(0,'','','','');
    this.url = 'http://localhost:8000/api/';
  }

  ngOnInit() {
    console.log('Creado componente PRODUCTO-ADD.');
  }

  onSubmit(){
    if(this.filesToUpload){
    this._productoService.makeFileRequest(this.url+'upload-file', this.filesToUpload)
          .then((result)=>{
            // console.log(result);
            this.resultToUpload = result;
            this.producto.imagen = this.resultToUpload.filename;
            this.saveProducto();
          }, (error) => {
            console.log(error);
          });
        }else{
          this.saveProducto();
        }        
  } //final onSubmit

  saveProducto(){
    this._productoService.addProducto(this.producto)
    .subscribe(
      response => {
        if(response.code == 201){
          this._router.navigate(['productos']);
        }else{
          console.log("Ha ocurrido un error con código: " + response.code);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = fileInput.target.files[0];
    this.nameImag = this.filesToUpload.name;
    console.log("filesToUpload: " + this.filesToUpload);
  }
}
