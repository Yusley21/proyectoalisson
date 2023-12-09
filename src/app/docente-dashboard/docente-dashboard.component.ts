import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocenteModel } from './docente-dash board.model';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-docente-dashboard',
  templateUrl: './docente-dashboard.component.html',
  styleUrls: ['./docente-dashboard.component.css']
})
export class DocenteDashboardComponent implements OnInit {
  formValue!: FormGroup;
  docenteModelObj: DocenteModel = new DocenteModel();
  docenteData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      docente: [''],
      cedula: [''],
      codigo: [''],
      asignatura: [''],
      curso: [''],
      horario: [''],
      aula: ['']
    });
    this.getAllDocente();
  }

  clickAddDocente() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postDocenteDetails() {
    this.docenteModelObj.docente = this.formValue.value.docente;
    this.docenteModelObj.cedula = this.formValue.value.cedula;
    this.docenteModelObj.codigo = this.formValue.value.codigo;
    this.docenteModelObj.asignatura = this.formValue.value.asignatura;
    this.docenteModelObj.curso = this.formValue.value.curso;
    this.docenteModelObj.horario = this.formValue.value.horario;
    this.docenteModelObj.aula = this.formValue.value.aula;

    this.api.postDocente(this.docenteModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Docente agregado correctamente");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllDocente();
      },
      err => {
        alert("Intente de nuevo");
      });
  }

  getAllDocente() {
    this.api.getDocente()
      .subscribe(res => {
        this.docenteData = res;
      });
  }

  deleteDocente(row: any) {
    this.api.deleteDocente(row.id)
      .subscribe(res => {
        alert("Docente Eliminado");
        this.getAllDocente();
      });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.docenteModelObj.id = row.id;
    this.formValue.controls['docente'].setValue(row.docente);
    this.formValue.controls['cedula'].setValue(row.cedula);
    this.formValue.controls['codigo'].setValue(row.codigo);
    this.formValue.controls['asignatura'].setValue(row.asignatura);
    this.formValue.controls['curso'].setValue(row.curso);
    this.formValue.controls['horario'].setValue(row.horario);
    this.formValue.controls['aula'].setValue(row.aula); 
  }


  onEdite(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.docenteModelObj.id = row.id;
    this.formValue.controls['docente'].setValue(row.docente);
    this.formValue.controls['cedula'].setValue(row.cedula);
    this.formValue.controls['codigo'].setValue(row.codigo);
    this.formValue.controls['asignatura'].setValue(row.asignatura);
    this.formValue.controls['curso'].setValue(row.curso);
    this.formValue.controls['horario'].setValue(row.horario);
    this.formValue.controls['aula'].setValue(row.aula);
  
    // Agregar la navegación a la página de asistencias con parámetros
    this.router.navigate(['/asistencias'], {
      queryParams: {
        docente: row.docente,
        asignatura: row.curso // o asignatura, según lo que necesites
      }
    });
  }
  updateDocenteDetails() {
    this.docenteModelObj.docente = this.formValue.value.docente;
    this.docenteModelObj.cedula = this.formValue.value.cedula;
    this.docenteModelObj.codigo = this.formValue.value.codigo;
    this.docenteModelObj.asignatura = this.formValue.value.asignatura;
    this.docenteModelObj.curso = this.formValue.value.curso;
    this.docenteModelObj.horario = this.formValue.value.horario;
    this.docenteModelObj.aula = this.formValue.value.aula;

    this.api.updateDocente(this.docenteModelObj, this.docenteModelObj.id)
      .subscribe(res => {
        alert("Actualizado correcto");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllDocente();
      });
  }
}
