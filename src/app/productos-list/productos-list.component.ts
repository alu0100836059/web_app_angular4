import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


//Importamos el servicio
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css'],
  providers: [ProductoService]
})
export class ProductosListComponent implements OnInit {
  
  public titulo:string;
  public productos:Array<Producto>;
  public delete_confirmed;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService
  ) {
    this.titulo = 'Listado de productos';
    this.delete_confirmed = false;
   }

  ngOnInit() {
   this.getProductos();
  }

  deleteConfirm(id){
    this.delete_confirmed = id;
  }

  deleteCancel(){
    this.delete_confirmed = null;
  }

  getProductos(){
    this._productoService.getProductos()
    .subscribe(
      result=> {
        this.productos = result;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  onDeleteProducto(id){
    this._productoService.deleteProducto(id)
      .subscribe(response => {
          if(response.code == 200){
            this.getProductos();
          }else{
            alert('Ha sucedido un problema, intente recargar la página por favor');
          }

      }, error =>{
          console.log(<any>error);
      });
  }

}
