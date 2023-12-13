import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DocenteDashboardComponent } from './docente-dashboard/docente-dashboard.component';
import { PrincipalComponent } from './principal/principal.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { PrinComponent } from './prin/prin.component';
import { GaleriaComponent } from './galeria/galeria.component';


const routes: Routes = [
  {path:'', redirectTo:'principal', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'principal', component:PrincipalComponent},
  {path:'asistencias', component:AsistenciasComponent},
  {path:'dashboard', component:DocenteDashboardComponent},
  {path:'prin', component:PrinComponent},
  { path: 'galeria', component: GaleriaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
