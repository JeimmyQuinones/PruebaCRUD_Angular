import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
//modale instalar ng add ngx-bootstrap  --component modals

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
//Formularios


//Servicio
import { HttpClientModule} from '@angular/common/http';

//Rutas
import { App_routing } from './app.routes';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './Pages/usuarios/usuarios.component';
import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { LoadingComponent } from './Components/shared/loading/loading.component';
import { ProcesosComponent } from './Pages/procesos/procesos.component';
import { FooterComponent } from './Components/shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    NavbarComponent,
    LoadingComponent,
    ProcesosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, 
    App_routing,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
