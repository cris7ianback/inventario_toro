import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CustomValidationService } from 'src/app/_services/custom-validation.service';
import { UsuarioService } from 'src/app/_services/usuario.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {


  formAgUser !: UntypedFormGroup;
  hide = true;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private toast: NgToastService,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<AddUsersComponent>,
    private customValidator: CustomValidationService
  ) { }

  ngOnInit(): void {

    this.formAgUser = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      rol: ['', [Validators.required, Validators.minLength(3)]]
    },
      { validators: [this.customValidator.camposIguales('password', 'confirmPassword')] })
  }

  registrarUsuario() {
    if (this.formAgUser.valid) {
      this.usuarioService.addUser(this.formAgUser.value)
        .subscribe({
          next: (res) => { },
          error: (err) => {
            if (err.status === 200) {
              this.toast.success({
                detail: "Usuario registrado",
                summary: "Usuario registrado con exito",
                duration: 3000,
                position: 'br'
              })

              this.formAgUser.reset();
              this.dialogRef.close('Registrar Usuario')


            } else {
              this.toast.error({
                detail: "Atención",
                summary: "Personal ya se encuentra Registrado",
                duration: 3000,
                position: 'br'
              })
            }

          }

        })
    }
  }

  campoEsValido(campo: string) {
    return this.formAgUser.controls[campo].errors
      && this.formAgUser.controls[campo].touched;
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarUsuarios']);
  }

}
