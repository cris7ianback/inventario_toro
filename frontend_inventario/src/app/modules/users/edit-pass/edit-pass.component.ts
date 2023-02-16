import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CustomValidationService } from 'src/app/_services/custom-validation.service';
import { UsuarioService } from 'src/app/_services/usuario.service';

@Component({
  selector: 'app-edit-pass',
  templateUrl: './edit-pass.component.html',
  styleUrls: ['./edit-pass.component.css']
})
export class EditPassComponent implements OnInit {
  formModUsuario!: UntypedFormGroup;
  hide = true;

  currentPersonal?: {};
  currentIndex = -1;

  constructor(private router: Router,
    private toast: NgToastService,
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<EditPassComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private usuarioService: UsuarioService,
    private customValidator: CustomValidationService) {

    this.formModUsuario = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]]
    },
      { validators: [this.customValidator.camposIguales('password', 'confirmPassword')] }
    );
    if (this.editData) {
      this.formModUsuario.controls['password'].setValue('');
    }

  }

  ngOnInit(): void {
  }

  cancelar() {
    this.toast.warning({
      detail: 'Atención',
      summary: 'Acción Cancelada Exitosa',
      duration: 3000,
      position: 'br',
    });
    this.router.navigate(['/listarUsuarios']);
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.formModUsuario.controls[controlName].hasError(errorName);
  };

  modifyPassUser() {
    this.usuarioService
      .modifyPassUser(this.formModUsuario.value, this.editData)
      .subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Password Modificada',
            summary: 'Password de usuario modificada con exito',
            duration: 3000,
            position: 'br',
          });

          this.formModUsuario.reset();
          this.dialogRef.close('Modificar Password');
        },
        error: () => {
          this.toast.error({
            detail: 'Error de Solicitud',
            summary: 'Error Al modificar Password',
            duration: 3000,
            position: 'br',
          });
        },
      });
  }

  refreshList(): void {
    window.location.reload();
    this.currentPersonal = {};
    this.currentIndex = -1;
  }

}
