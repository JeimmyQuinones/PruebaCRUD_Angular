import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//ng add @ng-bootstrap/ng-bootstrap

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appservice } from '../../Service/Appservice.service';
import { UsuarioModel } from '../../Models/Usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  ////////////////////variables
Nombremodal:string="Editar";
ideliminar:number;
NombreEliminar:string="";
showModal:BsModalRef;
EliminarModal:BsModalRef;
forma:FormGroup;
ListUsuarios:any[]=[];
loading:boolean=false;
loadingUser:boolean=false;
loadingsave:boolean=false;
Usuario= new UsuarioModel();

////////////////////////////////7

  constructor( private modalService: BsModalService, private fb: FormBuilder, private Modelservice:Appservice) { 
    this.Getlistausuarios();
    this.Crearformulario();
  }
  /////////////////validaciones
  get nombreNovalido(){
    return this.forma.get('Nombre').invalid && this.forma.get('Nombre').touched
  }
  get apellidoNovalido(){
    return this.forma.get('Apellidos').invalid && this.forma.get('Apellidos').touched
  }
  get correoNovalido(){
    return this.forma.get('Email').invalid && this.forma.get('Email').touched
  }
  get identificacionNovalido(){
    return this.forma.get('Numeroidentificacion').invalid && this.forma.get('Numeroidentificacion').touched
  }
////////////////////////////
  
  ngOnInit(): void {
  }
  Crearformulario(){
    this.forma= this.fb.group({
      IdUsuario:[''],
      Nombre:['',[Validators.required, Validators.minLength(5)]],
      Apellidos:['',[Validators.required, Validators.minLength(5)]],
      Numeroidentificacion:['',[Validators.required, Validators.minLength(5)]],
      Email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
  }
  openmodal(template: TemplateRef<any>, nombre:string){
    this.Nombremodal= nombre;
    this.showModal=this.modalService.show(template);
  }
  closemodal(){
    this.showModal.hide();
      this.forma.reset();
  }
  openmodalEliminar(template: TemplateRef<any>, id:number,nombre:string){
    this.NombreEliminar= nombre;
    this.ideliminar=id;
    this.EliminarModal=this.modalService.show(template);
  }
  closemodalEliminar(){
    this.EliminarModal.hide();
  }
  Guardar(){
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control=>{
          control.markAllAsTouched();
      });
    }else{
      let user= this.forma.value;
        user.Numeroidentificacion=parseInt(user.Numeroidentificacion);
        user.IdUsuario=parseInt(user.IdUsuario);
      if(this.Nombremodal==="Editar"){
        this.SaveUsuario(user);
      }else{
        this.AddUsuario(user);
      }
      
    }
  }
  Editar(template: TemplateRef<any>, id:number){
    this.Cargardataalformulario(id);
    this.openmodal(template,"Editar");
  
  }
  Cargardataalformulario(id:number){
    this.loadingUser=true;
    this.Modelservice.getUsuario(id)
    .subscribe((data:any)=>{
        this.forma.reset({
          IdUsuario: data.IdUsuario,
          Nombre: data.Nombre,
          Apellidos:data.Apellidos,
          Numeroidentificacion:data.Numeroidentificacion,
          Email:data.Email,
      });
        this.loadingUser=false;
    },(error)=>{
      console.log("Error");
      this.loadingUser=false;
    });
     
  }

  Getlistausuarios(){
    this.loading=true;
    this.Modelservice.getUsuarios()
    .subscribe((data:any)=>{
        this.ListUsuarios= data;
        this.loading=false;
    },(error)=>{
      console.log("Error");
      this.loading=false;
    });
  }
  AddUsuario(Usuario){
    this.loadingsave=true;
    this.Modelservice.addUsuario(Usuario)
    .subscribe((data:any)=>{
      this.Getlistausuarios();
      this.loadingsave=false;
    },(error)=>{
      console.log(error);
      this.loadingsave=false;
    });
  }
  SaveUsuario(Usuario){
    this.loadingsave=true;
    this.Modelservice.saveUsuario(Usuario)
    .subscribe((data:any)=>{
      this.Getlistausuarios();
      this.loadingsave=false;
    },(error)=>{
      console.log(error);
      this.loadingsave=false;
    });
  }
  DeleteUsuario(){
    this.Modelservice.deleteUsuario( this.ideliminar)
    .subscribe((data:any)=>{
      this.Getlistausuarios();
      this.closemodalEliminar();
    },(error)=>{
      console.log(error);
    });
  }
}
