import { Injectable } from '@angular/core';
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

  constructor() { }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log(user);
      return JSON.parse(user);
    }
    return {};
  }


}
