import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './Pages/usuarios/usuarios.component';
import { ProcesosComponent } from './Pages/procesos/procesos.component';

const APP_ROUTES:Routes=[
    {path:'Usuarios', component:UsuariosComponent },
    {path:'Procesos', component:ProcesosComponent },
    {path:'**', pathMatch:'full', redirectTo:'Usuarios' }
];

export const App_routing = RouterModule.forRoot(APP_ROUTES);