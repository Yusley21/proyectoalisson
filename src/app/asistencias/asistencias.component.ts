import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsistenciasModel } from './asistencias.model';
import { ApiService } from '../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
 selector: 'app-asistencias',
 templateUrl: './asistencias.component.html',
 styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {
 formValue!: FormGroup;
 asistenciasModelObj: AsistenciasModel = new AsistenciasModel();
 asistenciasData!: any;
 showAdd!: boolean;
 showUpdate!: boolean;
 docenteNombre: string | null = null;
 asignaturaNombre: string | null = null;
 constructor(
 private formbuilder: FormBuilder, private api: ApiService, private router: Router, private route: 
ActivatedRoute
 ) {}
 ngOnInit(): void {
 this.formValue = this.formbuilder.group({
 estudiantes: [''],
 cedula: [''],
 correo: ['']
 });
 this.getAllAsistencias();
 // Obtener parámetros de la URL
 this.route.queryParams.subscribe(params => {
 this.docenteNombre = params['docente'];
 this.asignaturaNombre = params['asignatura'];
 });
 }
 clickAddAsistencias() {
 this.formValue.reset();
 this.showAdd = true;
 this.showUpdate = false;
 }
 postAsistenciasDetails() {
 this.asistenciasModelObj.estudiantes = this.formValue.value.estudiantes;
 this.asistenciasModelObj.cedula = this.formValue.value.cedula;
 this.asistenciasModelObj.correo = this.formValue.value.correo;
 this.api.postAsistencias(this.asistenciasModelObj)
 .subscribe(res => {
 console.log(res);
 alert('Estudiante agregado correctamente');
 let ref = document.getElementById('cancel');
 ref?.click();
 this.formValue.reset();
 this.getAllAsistencias();
 },
 err => {
 alert('Intente de nuevo');
 }
 );
 }
 getAllAsistencias() {
 this.api.getAsistencias()
 .subscribe(res => {
 this.asistenciasData = res;
 });
 }
 deleteAsistencias(row: any) {
 this.api.deleteAsistencias(row.id)
 .subscribe(res => {
 alert('Estudiante Eliminado');
 this.getAllAsistencias();
 });
 }
 onEdit(row: any) {
 this.showAdd = false;
 this.showUpdate = true;
 this.asistenciasModelObj.id = row.id;
 this.formValue.controls['estudiantes'].setValue(row.estudiantes);
 this.formValue.controls['cedula'].setValue(row.cedula);
 this.formValue.controls['correo'].setValue(row.correo);
 }
 updateAsistenciasDetails() {
 this.asistenciasModelObj.estudiantes = this.formValue.value.estudiantes;
 this.asistenciasModelObj.cedula = this.formValue.value.cedula;
 this.asistenciasModelObj.correo = this.formValue.value.correo;
 this.api.updateAsistencias(this.asistenciasModelObj, this.asistenciasModelObj.id)
 .subscribe(res => {
 alert("Actualizado correcto");
 let ref = document.getElementById('cancel');
 ref?.click();
 this.formValue.reset();
 this.getAllAsistencias();
 });
 }
}
