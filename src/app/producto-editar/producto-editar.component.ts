import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css'],
  providers: [ProductoService]
})
export class ProductoEditarComponent implements OnInit {
  public titulo: string;
  public producto: Producto;
  public filesToUpload;
  public resultToUpload;
  public nameImag;
  public is_edit;
  public url;

  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.titulo = 'Editar producto';
    this.producto = new Producto(0,'','','','');
  }

  ngOnInit() {
    console.log("Creado correctamente PRODUCTO-EDITAR-COMPONENT");
    this.getProducto();
    this.is_edit = true;
    this.url = 'http://localhost:8000/api/';
  }

  onSubmit(){
    if(this.filesToUpload){
    this._productoService.makeFileRequest(this.url+'upload-file', this.filesToUpload)
          .then((result)=>{
            // console.log(result);
            this.resultToUpload = result;
            this.producto.imagen = this.resultToUpload.filename;
            this.updateProducto();
          }, (error) => {
            console.log(error);
          });
        }else{
          this.updateProducto();
        }        
  } //final onSubmit

  updateProducto(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

    this._productoService.editProducto(id, this.producto)
    .subscribe(
      response => {
        if(response.code == 200){
          this._router.navigate(['/producto/', id]);
        }else{
          console.log("Ha ocurrido un error con código: " + response.code);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  });
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = fileInput.target.files[0];
    this.nameImag = this.filesToUpload.name;
  }

  getProducto(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      
      this._productoService.getProducto(id).subscribe(
        response => {
          if(response.code == 200){
            this.producto = response.data;
          }else{
            this._router.navigate(['/productos']);
          }
        }, error => {
          console.log(<any>error);
        }
      );
    });
  }


}
