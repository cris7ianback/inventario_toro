import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from './dialog.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  estado?: boolean;
  private data = [];
  private URL: string = environment.URL;
  getChartDataEvent: any;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService,
    private dialogService: DialogService
    
  ) { }

  getToken() {
    return localStorage.getItem('item');
  }
  isRolId() {
    return this.http.get<any>(this.URL + 'isRolId');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  login(usuario: any) {
    return this.http.post<any>(this.URL + 'login', usuario);
  }

  logout(){
    this.dialogService
    .openConfirmDialog('Está seguro de Cerrar Sesión?')
    .afterClosed()
    .subscribe((res:any)=>{
      if (res){
        this.http.get<any>(this.URL + 'logout').subscribe(
          (res) =>{},
          (err)  =>{

            this.toast.success({
              detail: 'Sesión Finalizada',
              summary: 'Usuario deslogueado.',
              duration: 3000,
              position: 'br',
            });
            localStorage.removeItem('token');
            return this.router.navigate(['login']);

          }
        )
      }
    })
  }

  public getChartData() {
    const self = this;

    self.data = [];

    setTimeout(() => {
      self.getChartDataEvent.next(self.data);
    }, 2000);
  }

}
