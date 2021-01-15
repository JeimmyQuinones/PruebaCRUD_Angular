import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../Models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class Appservice {

  constructor(private http:HttpClient) {  
  }
  private url='https://localhost:44377/Api/';
  /////////////////////Uusarios////////////////////////////
  getUsuarios(){
    return this.http.get(this.url+'Usuarios');
  }
  getUsuario(id:number){
    return this.http.get(this.url+'Usuario?id='+id);
  }
  addUsuario(Usuario:any){
    return this.http.post(this.url+'AddUsuario',Usuario);
  }
  saveUsuario(Usuario:any){
    return this.http.put(this.url+'SaveUsuario',Usuario);
  }
  deleteUsuario(id:number){
    return this.http.delete(this.url+'DeleteUsuario?id='+id);
  }
  ///////////////////////
  /////////////////////Procesos////////////////////////////
  getProcesos(){
    return this.http.get(this.url+'Procesos');
  }
  getProceso(id:number){
    return this.http.get(this.url+'Proceso?id='+id);
  }
  getProcesospadreyusuario(){
    return this.http.get(this.url+'GetAddProceso');
  }
  addProceso(Model:any){
    return this.http.post(this.url+'AddProceso',Model);
  }
  saveProceso(Model:any){
    return this.http.put(this.url+'SaveProceso',Model);
  }
  deleteProceso(id:number){
    return this.http.delete(this.url+'DeleteProceso?id='+id);
  }
  ///////////////////////
  
}
