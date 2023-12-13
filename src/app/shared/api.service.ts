import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postDocente(data : any){
    return this.http.post<any>("http://localhost:3000/datas", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getDocente(){
    return this.http.get<any>("http://localhost:3000/datas")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateDocente(data : any,id: number){
    return this.http.put<any>("http://localhost:3000/datas/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteDocente(id : number){
    return this.http.delete<any>("http://localhost:3000/datas/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }




  postAsistencias(data : any){
    return this.http.post<any>("http://localhost:3000/studu", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAsistencias(){
    return this.http.get<any>("http://localhost:3000/studu")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  
  

  updateAsistencias(data : any,id: number){
    return this.http.put<any>("http://localhost:3000/studu/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteAsistencias(id : number){
    return this.http.delete<any>("http://localhost:3000/studu/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
}