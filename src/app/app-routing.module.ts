import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RoomsComponent } from './features/rooms/rooms.component';
import { TableComponent } from './shared/ui/table/table.component';
import { LoginComponent } from './features/login/login.component';
const routes: Routes = [
  // 1) วาง 'auth' ไว้ก่อน
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'login' }
    ],
  },

  // 2) แล้วค่อยตามด้วยส่วนที่ล็อกอินแล้วเท่านั้น
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'rooms', component: RoomsComponent },
      { path: 'table', component: TableComponent },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },

  // 3) ถ้าจะมี redirect ต้นทาง คงไว้ได้ (ไม่มีก็ได้)
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration:
      'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
