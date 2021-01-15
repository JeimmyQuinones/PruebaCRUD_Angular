import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//ng add @ng-bootstrap/ng-bootstrap

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appservice } from '../../Service/Appservice.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  ////////////////////variables
Nombremodal:string="Editar";
showModal:BsModalRef;
forma:FormGroup;
ListUsuarios:any[]=[];
loading:boolean=false;
loadingUser:boolean=false;
loadingsave:boolean=false;
////////////////////////////////7

  constructor( private modalService: BsModalService, private fb: FormBuilder, private Modelservice:Appservice) { 
    this.Getlistausuarios();
    this.Crearformulario();
  }
  /////////////////validaciones
  get nombreNovalido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNovalido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoNovalido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get identificacionNovalido(){
    return this.forma.get('numeroidentificacion').invalid && this.forma.get('numeroidentificacion').touched
  }
////////////////////////////
  
  ngOnInit(): void {
  }
  Crearformulario(){
    this.forma= this.fb.group({
    nombre:['',[Validators.required, Validators.minLength(5)]],
    apellido:['',[Validators.required, Validators.minLength(5)]],
    numeroidentificacion:['',[Validators.required, Validators.minLength(5)]],
    correo:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
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
  Guardar(){
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control=>{
          control.markAllAsTouched();
      });
    }else{
      this.loadingsave=true;
      if(this.Nombremodal==="Editar"){
        setTimeout(() => {
          this.loadingsave=false;
          this.closemodal();
        },3000);
      }else{
        setTimeout(() => {
          this.loadingsave=false;
          this.closemodal();
        },3000);
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
          nombre: data.Nombre,
          apellido:data.Apellidos,
          numeroidentificacion:data.Numeroidentificacion,
          correo:data.Email,
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
 

}
