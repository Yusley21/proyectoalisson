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

  constructor(
    private formbuilder: FormBuilder,
    private api : ApiService,
    private router: Router)
    {}
  
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
    nombre: [''],
    foto: [null],
    carrera: [''],
    universidad: [''],
    anoGraduacion: [''],
    empleoActual: [''],
    tiempoSinTrabajo: ['']
  });
  this.getAllDocente();

}
guardarDatos() {
  // ... Código para guardar datos utilizando TuServicioDeDatos

  // Supongamos que has guardado los datos con éxito
  // Ahora, navega a la página de la galería
  this.router.navigate(['/galeria']);
}

onFileSelected(event: any) {
  const selectedFile: File = event.target.files[0];

  if (selectedFile) {
    this.formValue.patchValue({
      foto: selectedFile
    });
    this.formValue.get('foto')?.updateValueAndValidity(); // Actualizar la validez del campo

    // Crear una vista previa de la imagen
    const reader = new FileReader();
    reader.onload = () => {
      this.formValue.patchValue({
        foto: reader.result
      });
    };
    reader.readAsDataURL(selectedFile);
  }
}


clickAddDocente() {
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
}
postDocenteDetails() {
  this.docenteModelObj.nombre = this.formValue.value.nombre;
  this.docenteModelObj.foto = this.formValue.value.foto;
  this.docenteModelObj.carrera = this.formValue.value.carrera;
  this.docenteModelObj.universidad = this.formValue.value.universidad;
  this.docenteModelObj.anoGraduacion = this.formValue.value.anoGraduacion;
  this.docenteModelObj.empleoActual = this.formValue.value.empleoActual;
  this.docenteModelObj.tiempoSinTrabajo = this.formValue.value.tiempoSinTrabajo;

  this.api.postDocente(this.docenteModelObj)
    .subscribe(res => {
      console.log(res);
      alert("Estudiante agregado correctamente");
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
  this.formValue.controls['nombre'].setValue(row.nombre);
  this.formValue.controls['foto'].setValue(row.foto);
  this.formValue.controls['carrera'].setValue(row.carrera);
  this.formValue.controls['universidad'].setValue(row.universidad);
  this.formValue.controls['anoGraduacion'].setValue(row.anoGraduacion);
  this.formValue.controls['empleoActual'].setValue(row.empleoActual);
  this.formValue.controls['tiempoSinTrabajo'].setValue(row.tiempoSinTrabajo); 
  
}


onEdite(row: any) {
  this.showAdd = false;
  this.showUpdate = true;
  this.docenteModelObj.id = row.id;
  this.formValue.controls['nombre'].setValue(row.nombre);
  this.formValue.controls['foto'].setValue(row.foto);
  this.formValue.controls['carrera'].setValue(row.carrera);
  this.formValue.controls['universidad'].setValue(row.universidad);
  this.formValue.controls['anoGraduacion'].setValue(row.anoGraduacion);
  this.formValue.controls['empleoActual'].setValue(row.empleoActual);
  this.formValue.controls['tiempoSinTrabajo'].setValue(row.tiempoSinTrabajo); 

}
updateDocenteDetails() {
  this.docenteModelObj.nombre = this.formValue.value.nombre;
  this.docenteModelObj.foto = this.formValue.value.foto;
  this.docenteModelObj.carrera = this.formValue.value.carrera;
  this.docenteModelObj.universidad = this.formValue.value.universidad;
  this.docenteModelObj.anoGraduacion = this.formValue.value.anoGraduacion;
  this.docenteModelObj.empleoActual = this.formValue.value.empleoActual;
  this.docenteModelObj.tiempoSinTrabajo = this.formValue.value.tiempoSinTrabajo;

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
