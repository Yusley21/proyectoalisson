import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocenteDashboardComponent } from './docente-dashboard/docente-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PrincipalComponent } from './principal/principal.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';


@NgModule({
  declarations: [
    AppComponent,
    DocenteDashboardComponent,
    LoginComponent,
    SignupComponent,
    PrincipalComponent,
    AsistenciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
