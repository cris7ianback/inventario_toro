import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-productos',
  templateUrl: './edit-productos.component.html',
  styleUrls: ['./edit-productos.component.css']
})
export class EditProductosComponent {

  formEditPeriferico!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private toast: NgToastService,
    private router: Router
  ){

    this.formEditPeriferico = this.fb.group({
      equipo: ['', [Validators.minLength(3)]],
      serial_number: ['', [ Validators.minLength(3)]],
      modelo: ['', [ Validators.minLength(3)]],
      license: ['', [ Validators.minLength(3)]],
      ip_addr: ['', [ Validators.minLength(3)]],
      ubicacion: ['', [ Validators.minLength(3)]],
      version: ['', [ Validators.minLength(3)]],
      connected_to: ['', [ Validators.minLength(3)]],
      expire_date: ['', [ Validators.minLength(3)]],
      activation_date: ['', [ Validators.minLength(3)]],
      provider: ['', [ Validators.minLength(3)]],
      state: ['', [ Validators.minLength(3)]],
    });
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada Exitosa",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/activos']);
  }


}
