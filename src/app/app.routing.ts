import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProductoAddComponent } from './producto-add/producto-add.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoEditarComponent } from './producto-editar/producto-editar.component';


/*
    Incluyo el tema del pathMatch para solventar un pequeño bug de 
    la última versión de Angular.
*/
const appRoutes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'home', component: HomeComponent, pathMatch: 'full'},
    {path: 'productos', component: ProductosListComponent, pathMatch: 'full'}, 
    {path: 'crear-producto', component: ProductoAddComponent, pathMatch: 'full'},
    {path: 'producto/:id', component: ProductoDetailComponent, pathMatch: 'full'},
    {path: 'editar-producto/:id', component: ProductoEditarComponent, pathMatch: 'full'},    
    {path: '**', component: ErrorComponent, pathMatch: 'full'}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);