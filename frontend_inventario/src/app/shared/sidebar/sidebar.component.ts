import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AddUsersComponent } from 'src/app/modules/users/add-users/add-users.component';
import { AuthService } from 'src/app/_services/auth.service';
import { MessagesService } from 'src/app/_services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentPersonal?: {};
  currentIndex = -1;
  logenIn: any;
  estado_admin: boolean = false;
  estado_perimetral: boolean = false;
  estado_interna: boolean = false;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private messages: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logenIn = this.authService.loggedIn();
    if (!this.logenIn) {
      this.messages.menssageCritical(
        'Error logging',
        'Debe estar autenticado para ver este contenido'
      );
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.authService.isRolId().subscribe(
        (res) => {
          switch (res.status) {
            case 201:
              this.estado_admin = true;
              break;
            case 202:
              this.estado_perimetral = true;
              break;
            case 203:
              this.estado_interna = true;
              break;
            default:
              this.messages.menssageCritical(
                'Error logging',
                'No puede ver este contenido'
              );
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
          }
        },
        (error) => {
          this.messages.menssageCritical(
            'Error logging',
            'No puede ver este contenido'
          );
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      );
    }
  }

  addUser() {
    if (!this.estado_admin) {
      this.messages.menssageCritical(
        'Error logging',
        'No puede ver este contenido'
      );
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    } else {
      this.dialog
        .open(AddUsersComponent, {
          width: '50%',
        })
        .afterClosed()
        .subscribe((val: any) => {
          if (val === 'Registrar Usuario') {
            this.refreshList();
          }
        });
    }
  }






  refreshList(): void {
    window.location.reload();
    this.currentPersonal = {};
    this.currentIndex = -1;
  }
}
