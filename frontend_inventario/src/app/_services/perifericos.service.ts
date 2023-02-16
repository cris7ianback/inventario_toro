import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Grado } from '../models/grado';
import { Perifericos } from '../models/perifericos';

@Injectable({
  providedIn: 'root'
})
export class PerifericoService {

  private URL = environment.URL;


  constructor(private http: HttpClient) { }

  addPerifericos(periferico: any) {
    return this.http.post<any>(this.URL + '/addPeriferico', periferico);
  }

  deletePeriferico(id: any) {    
    return this.http.get(this.URL + `/deletePeriferico/${id}`)
  }

  listPerifericos() {
    return this.http.get<Perifericos[]>(this.URL + '/listPerifericos')
  }

  getGrado() {
    return this.http.get<Grado[]>(this.URL + '/listGrado')
  }


  
}
