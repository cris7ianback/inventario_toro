import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

import { UsersComponent } from './modules/users/users.component';


import { HomeComponent } from './components/home/home.component';

import { ProductosComponent } from './modules/productos/productos..component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    children: [{
      path: 'users',
      component: UsersComponent
    },

    {
      path: 'productos',
      component: ProductosComponent
    },
   

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

