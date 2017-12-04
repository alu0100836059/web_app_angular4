import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css'],
  providers: [ProductoService]
})
export class ProductoAddComponent implements OnInit {
  public titulo: string;

  constructor() { 
    this.titulo = 'Crear un nuevo producto';
  }

  ngOnInit() {
    console.log('Creado componente PRODUCTO-ADD.');
  }

}
