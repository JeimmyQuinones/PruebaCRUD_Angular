import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Appservice } from 'src/app/Service/Appservice.service';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent  {
  Nombremodal:string="";
  forma:FormGroup;
  ListProcesos:any[]=[];
  showModal:BsModalRef;
  EliminarModal:BsModalRef;
  loading:boolean=false;
  ListProcesospadre:any[]=[];
  ListUsuarios:any[]=[];
  loadingsave:boolean=false;
  loadingUser:boolean=false;
  ideliminar:number;
  NombreEliminar:string="";


  constructor(private modalService: BsModalService, private fb: FormBuilder, private Modelservice:Appservice) { 
      this.Getlistaprocesos();
      this.Crearformulario();
  }
  get nombreNovalido(){
    return this.forma.get('Nombre').invalid && this.forma.get('Nombre').touched
  }
  get UsuarioNovalido(){
    return this.forma.get('IdUsuario').invalid && this.forma.get('IdUsuario').touched && this.forma.get('IdUsuario').value =='-1'
  }

  Crearformulario(){
    this.forma= this.fb.group({
      IdProceso:[''],
      IdUsuario:['',[Validators.required]],
      Nombre:['',[Validators.required, Validators.minLength(5)]],
      Procesopadre:[''],
    });
  }
  openmodal(template: TemplateRef<any>, nombre:string){
    this.Nombremodal= nombre;
    this.Getlistausuariosprocesos();
    this.showModal=this.modalService.show(template);
  }
  closemodal(){
    this.showModal.hide();
      this.forma.reset(
        {
          IdUsuario: "-1",
          Procesopadre: "-1"
        }
      );
  }
  openmodalEliminar(template: TemplateRef<any>, id:number,nombre:string){
    this.NombreEliminar= nombre;
    this.ideliminar=id;
    this.EliminarModal=this.modalService.show(template);
  }
  closemodalEliminar(){
    this.EliminarModal.hide();
  }
  Editar(template: TemplateRef<any>, id:number){
    
    this.openmodal(template,"Editar");
    this.Cargardataalformulario(id);
  
  }
  Cargardataalformulario(id:number){
    this.loadingUser=true;
    this.Modelservice.getProceso(id)
    .subscribe((data:any)=>{
      let proce=data.Procesopadre;
      if(proce==null){
        proce="-1";
      }
        this.forma.reset({
          IdProceso: data.IdProceso,
          IdUsuario: data.IdUsuario,
          Nombre: data.Nombre,
          Procesopadre: proce
      });
        this.loadingUser=false;
    },(error)=>{
      console.log("Error");
      this.loadingUser=false;
    });
     
  }
  Getlistaprocesos(){
    this.loading=true;
    this.Modelservice.getProcesos()
    .subscribe((data:any)=>{
        this.ListProcesos= data;
        this.loading=false;
    },(error)=>{
      console.log("Error");
      this.loading=false;
    });
  }
  Getlistausuariosprocesos(){
    this.Modelservice.getProcesospadreyusuario()
    .subscribe((data:any)=>{
      this.ListProcesospadre=data.procesos;
      this.ListUsuarios= data.usuarios;
    },(error)=>{
      console.log("Error");
    });
  }
  Guardar(){
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control=>{
          control.markAllAsTouched();
      });
    }else{
      let user= this.forma.value;
        user.IdUsuario=parseInt(user.IdUsuario);
        user.IdProceso=parseInt(user.IdProceso);
      if(this.Nombremodal==="Editar"){
        this.SaveProceso(user);
        
        
      }else{
        this.AddProceso(user);
      }
      
    }
  }
  AddProceso(Model){
    this.loadingsave=true;
    this.Modelservice.addProceso(Model)
    .subscribe((data:any)=>{
      this.Getlistaprocesos();
      this.loadingsave=false;
    },(error)=>{
      console.log(error);
      this.loadingsave=false;
    });
  }
  SaveProceso(Model){
    this.loadingsave=true;
    this.Modelservice.saveProceso(Model)
    .subscribe((data:any)=>{
      this.Getlistaprocesos();
      this.loadingsave=false;
    },(error)=>{
      console.log(error);
      this.loadingsave=false;
    });
  }
  DeleteProceso(){
    this.Modelservice.deleteProceso( this.ideliminar)
    .subscribe((data:any)=>{
      this.Getlistaprocesos();
      this.closemodalEliminar();
    },(error)=>{
      console.log(error);
    });
  }

}
