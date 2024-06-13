import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewHotelComponent } from './pages/new-hotel/new-hotel.component';
import { NewRoomComponent } from './pages/new-room/new-room.component';
import { HotelListComponent } from './pages/hotel-list/hotel-list.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { UpdateHotelComponent } from './pages/update-hotel/update-hotel.component';
import { UpdateRoomComponent } from './pages/update-room/update-room.component';
import { NewAccommodationComponent } from './pages/new-accommodation/new-accommodation.component';
import { BookListComponent } from './pages/book-list/book-list.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'hotel-list',
        component: HotelListComponent
      },
      {
        path:'new-hotel',
        component: NewHotelComponent
      },
      {
        path: 'update-hotel',
        component: UpdateHotelComponent
      },
      {
        path: 'bookings/:id',
        component: BookListComponent
      },
      {
        path: 'room-list/:id',
        component: RoomListComponent
      },
      {
        path: 'new-room/:id',
        component: NewRoomComponent
      },
      {
        path: 'update-room',
        component: UpdateRoomComponent
      },
      {
        path: 'new-accommodation',
        component: NewAccommodationComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
