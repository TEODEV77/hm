import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './authentication/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then(m=>m.BookModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m=>m.AuthenticationModule)
  },
  {
    path: 'admin',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)

  },
  {
    path: 'reservation',
    loadChildren: () => import('./reservation/reservation.module').then(m=>m.ReservationModule)
  },
  {
    path: '**',
    redirectTo: 'book',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
