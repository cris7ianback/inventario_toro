import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Users } from '../models/users';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = environment.URL;
  private _usuario!: Users;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  addUser(user: any) {
    return this.http.post<any>(this.URL + '/addUser', user);
  }

  deleteUser(id: any) {  
    return this.http.get(this.URL + `/deleteUser/${id}`);
  }
  
  
  listUser() {
    return this.http.get<Users[]>(this.URL + '/listUser');
  }

  editUser(data: any, id: number) {
    return this.http.put<any>(this.URL + `/modifyUser/${id}`, data);
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log(user);
      return JSON.parse(user);
    }
    return {};
  }

  modifyPassUser(data: any, id_user: any) {
    return this.http.put<any>(this.URL + `/modifyPassUser/${id_user}`, data);
  }

}
