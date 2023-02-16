import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/_services/dialog.service';

import { Users } from 'src/app/models/users';
import { UsuarioService } from 'src/app/_services/usuario.service';

import { AuthService } from 'src/app/_services/auth.service';
import { AddUsersComponent } from './add-users/add-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditPassComponent } from './edit-pass/edit-pass.component';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  currentPersonal?: {};
  currentIndex = -1;
  estado?: boolean;
  id_user?: any;
  listUser!: Observable<Users[]>;
  listarUsuarios?: any;
  row: any;

  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'email',
    'rol',
    'acciones',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private usuarioService: UsuarioService,
    private _usuarioService: UsuarioService,
    private toast: NgToastService,
    private dialogService: DialogService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {

    this.cargarUsuarios();
    this._usuarioService.listUser().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  cargarUsuarios() {
    this.listUser = this.usuarioService.listUser();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshList(): void {
    window.location.reload();
    this.currentPersonal = {};
    this.currentIndex = -1;
  }




  deleteUser(id_user: any){
    this.dialogService
      .openConfirmDialog('¿Está seguro de eliminar Este Usuario?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.usuarioService.deleteUser(id_user).subscribe(
            (data) => {
              this.toast.success({
                detail: 'Accion Ejecutada',
                summary: 'Usuario Eliminado',
                duration: 2000,
                position: 'br',
              });
              this.refreshList();
            },
            (error) => {
              this.toast.warning({
                detail: 'Atencion',
                summary: 'Error al Eliminar Usuario',
                duration: 2000,
                position: 'br',
              });
            }
          );
        }
      });
  }



  // cancelar acción
  cancelar() {
    this.toast.warning({
      detail: 'Atención',
      summary: 'Acción Cancelada',
      duration: 3000,
      position: 'br',
    });
    this.router.navigate(['/listarUsuarios']);
  }

  editUser(row: any) {
    this.dialog
      .open(EditUserComponent, {
        width: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Modificar Usuario') {
          this.refreshList();
        }
      });
  }

  addUser() {
    this.dialog
      .open(AddUsersComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Registrar Usuario') {
          this.refreshList();
        }
      });
  }

  editPassword(id: any) {
    this.dialog
      .open(EditPassComponent, {
        width: '50%',
        data: id,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Modificar Password') {
          this.refreshList();
        }
      });
  }
}

