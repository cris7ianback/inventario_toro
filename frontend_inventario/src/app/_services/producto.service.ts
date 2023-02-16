import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Productos } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  private URL = environment.URL;

  constructor(private http: HttpClient) { }

  listProductos(){
    return this.http.get<Productos[]>(this.URL + '/listProductos'); 
  }

  addProducto(user: any) {
    return this.http.post<any>(this.URL + '/addProducto', user);
  }


  deleteProducto(id: any) {
    return this.http.get(this.URL + `/deleteProducto/${id}`);
  }

  editProducto(data: any, id: number) {
    return this.http.put<any>(this.URL + `/editProducto/${id}`, data);
  }


  getModel() {
    return this.http.get<any>(this.URL + '/listModeloF');
  }

  getLicense() {
    return this.http.get<any>(this.URL + '/listLicenses');
  }

  getProvider(){
    return this.http.get<any>(this.URL + '/listProviders');
  }

  getGraficosNode(){
    return this.http.get<any>(this.URL + '/listGraficosNodes');
  }

  

}
