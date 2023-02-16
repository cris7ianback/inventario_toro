import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Equipos } from '../models/equipos';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  
  private URL = environment.URL;

  constructor(private http: HttpClient) { }

  listEquipos(){
    return this.http.get<Equipos[]>(this.URL + '/listEquipos');
    
  }
}
