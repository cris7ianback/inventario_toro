import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: UntypedFormGroup;

  incorrecta!: boolean;

  formBuilder: any;
  isLoggedIn = false;
  roles: string[] = [];
  estado_admin: boolean = false;
  estado_usuario: boolean = false;
  estado_informatica: boolean = false;
  estado_gestor: boolean = false;

  email?: string;
  password?: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private usuarioService: UsuarioService,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        'cristian@gmail.com',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      password: ['asd12345', [Validators.required, Validators.minLength(3)]],
    });

    localStorage.removeItem('rid_ss0');

    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.usuarioService.getUser().roles;
    }
  }

  login(): void {
    this.incorrecta = false;

    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.authService.isRolId().subscribe(
          (res) => {
            // SI USUARIO ES PERFIL ADMIN ENTRA AQUÍ
            if (res.status == 201) {
              this.estado_admin = true;
              this.router.navigate(['activos']);
              this.messageService.menssageSuccessful(
                'Acceso Administrador',
                'Bienvenido Administrador'
              );
            } else {
              // SI USUARIO ES PERFIL DAC ENTRA AQUÍ
              if (res.status == 202) {
                this.estado_usuario = true;
                console.log('entra usuario');
                this.router.navigate(['activos']);
                this.toast.success({
                  detail: '¡Acceso Correcto!',
                  summary: '¡Bienvenido!',
                  duration: 3000,
                  position: 'br',
                });
              } else {
                // SI USUARIO ES INFORMATICA ENTRA AQUÍ
                if (res.status == 203) {
                  this.estado_informatica = true;
                  this.router.navigate(['/listarNoticias']);
                  this.toast.success({
                    detail: 'Acceso Exitoso',
                    summary: 'Bienvenido depto Informática ',
                    duration: 3000,
                    position: 'br',
                  });
                } else {
                  if (res.status === 204) {
                    this.estado_gestor = true;
                    this.router.navigate(['listarRequerimientos']);
                    this.toast.success({
                      detail: 'Acceso Exitoso',
                      summary: 'Bienvenido a Gestión de Requerimientos',
                      duration: 3000,
                      position: 'br',
                    });
                  }
                }
              }
            }
          },
          (err) => {
            //this.mensajeAlert();
          }
        );
      },

      // En caso de escribir mal o usuario levanta Error en ventana Principal.
      (serverLoginError: any) => {
        if (serverLoginError.status != 200) {
          this.messageService.menssageCritical(
            'Acceso Denegado',
            'Error de Contraseña o Email'
          );

          this.incorrecta = true;
        }
      }
    );

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  }

  OnResetForm(): void {
    this.loginForm.reset();
  }

  campoEsValido(email: any) {
    return (
      this.loginForm.controls[email].errors &&
      this.loginForm.controls[email].touched
    );
  }
}
