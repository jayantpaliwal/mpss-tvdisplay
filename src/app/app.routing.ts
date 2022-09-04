import { Routes, CanActivate } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './layouts/login/login.component';
import { AuthServiceService as AuthGuard } from './auth-service.service';
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin-layout',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }],
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: LoginComponent,
  }
]
