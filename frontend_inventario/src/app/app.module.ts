import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HasRoleGuard } from './has-role.guard';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { UsersComponent } from './modules/users/users.component';

import { AddUsersComponent } from './modules/users/add-users/add-users.component';
import { MatSelectModule } from '@angular/material/select';


import { EditUserComponent } from './modules/users/edit-user/edit-user.component';
import { EditPassComponent } from './modules/users/edit-pass/edit-pass.component';

import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductosComponent } from './modules/productos/productos..component';







@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MatConfirmDialogComponent,
        HomeComponent,
        HeaderComponent,
        SidebarComponent,
        UsersComponent,
        ProductosComponent,
        AddUsersComponent,
        EditUserComponent,
        EditPassComponent,
        ProductosComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatToolbarModule,
        NgToastModule,
        ReactiveFormsModule,
        RouterModule,
        MatInputModule,
        MatFormFieldModule,
        CommonModule,
        MatTableModule,
        RouterModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserModule,
        FormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatSelectModule,
        HighchartsChartModule,
        FlexLayoutModule
    ],
    providers: [
        AuthGuard,
        UntypedFormBuilder,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
        HasRoleGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
