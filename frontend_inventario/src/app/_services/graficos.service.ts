import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FirewallGraph } from '../models/firewallGraph';


@Injectable({
  providedIn: 'root'
})
export class GraficosService {
  
  private URL = environment.URL;

  constructor(private http: HttpClient) { }


  listNodes(): Observable<any> {
    return this.http.get(this.URL + '/listGraficosNodes');
  }

  listLinks(): Observable<any>{
    return this.http.get(this.URL + '/listGraficosLinks');
    
  }
}
