import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Appservice {

  constructor(private http:HttpClient) {  
  }
  getQuery (query:string){
    const url="https://localhost:44377/Api/"+query;
    return this.http.get(url);
  }
  getUsuarios(){
    return this.getQuery('Usuarios');
  }
  getUsuario(id:number){
    return this.getQuery('Usuario?id='+id);
  }
}
