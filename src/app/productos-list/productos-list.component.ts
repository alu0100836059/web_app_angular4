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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService
  ) {
    this.titulo = 'Listado de productos';
   }

  ngOnInit() {
    console.log('Se ha creado el componente PRODUCTOS-LIST');
    this._productoService.getProducto()
      .subscribe(
        result=> {
          this.productos = result;
        },
        error => {
          console.log(<any>error);
        }
      );
  }

}
