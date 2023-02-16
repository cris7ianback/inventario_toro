import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CustomValidationService } from 'src/app/_services/custom-validation.service';
import { UsuarioService } from 'src/app/_services/usuario.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formEditUser!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private customValidator: CustomValidationService,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private toast: NgToastService,
    private usuarioService: UsuarioService,
    private router: Router) {

    this.formEditUser = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      rol: ['', [Validators.required, Validators.minLength(3)]]
    }, {
      validators: [this.customValidator.camposIguales('password', 'confirmPassword')]

    });

    if (this.editData) {
      this.formEditUser.controls['nombre'].setValue(this.editData.nombre);
      this.formEditUser.controls['apellido'].setValue(this.editData.apellido);
      this.formEditUser.controls['email'].setValue(this.editData.email);
      this.formEditUser.controls['rol'].setValue(this.editData.rol);
    }

  }

  ngOnInit(): void {
  }

  editUser() {
    this.usuarioService.editUser(this.formEditUser.value, this.editData.id_user)
      .subscribe({
        next: (res) => {

          this.toast.success({
            detail: "Usuario Modificado",
            summary: "Usuario Modificado con Exito",
            duration: 3000,
            position: 'br',            
          })

          this.formEditUser.reset();
          this.dialogRef.close('Modificar Usuario')
        },
        error: () => {
          this.toast.error({
            detail: "Error de Solicitud",
            summary: "Error Al modificar Usuario",
            duration: 3000,
            position: 'br'
          })
        }
      })
  }




  campoEsValido(campo: string) {
    return this.formEditUser.controls[campo].errors
      && this.formEditUser.controls[campo].touched;
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada Exitosa",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarUsuarios']);
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.formEditUser.controls[controlName].hasError(errorName);
  }

}
