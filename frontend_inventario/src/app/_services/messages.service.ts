import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(
    private authService: AuthService,
    private toast: NgToastService
  ) {}

  menssageAlert(detail: any, summary: any) {
    this.toast.warning({
      detail: 'Atención',
      summary,
      duration: 2000,
      position: 'br',
    });
  }

  menssageCritical(detail: any, summary: any) {
    this.toast.error({
      detail,
      summary,
      duration: 2000,
      position: 'br',
    });
  }

  menssageSuccessful(detail: any, summary: any) {
    this.toast.success({
      detail,
      summary,
      duration: 2000,
      position: 'br',
    });
  }

  menssageInfo(detail: any, summary: any) {
    this.toast.info({
      detail: 'Error',
      summary,
      duration: 2000,
      position: 'br',
    });
  }
}
