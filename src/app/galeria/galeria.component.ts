import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  docenteData: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDocente().subscribe(
      (data) => {
        this.docenteData = data;
      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }
}
