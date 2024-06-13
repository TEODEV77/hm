import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewHotelComponent } from './pages/new-hotel/new-hotel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HotelListComponent } from './pages/hotel-list/hotel-list.component';
import { NewRoomComponent } from './pages/new-room/new-room.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { NewAccommodationComponent } from './pages/new-accommodation/new-accommodation.component';
import { HeaderComponent } from './components/header/header.component';
import { UpdateHotelComponent } from './pages/update-hotel/update-hotel.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UpdateRoomComponent } from './pages/update-room/update-room.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { BookCardComponent } from './components/book-card/book-card.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    NewHotelComponent,
    HotelListComponent,
    NewRoomComponent,
    RoomListComponent,
    NewAccommodationComponent,
    HeaderComponent,
    UpdateHotelComponent,
    UpdateRoomComponent,
    BookListComponent,
    HotelCardComponent,
    RoomCardComponent,
    BookCardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AuthenticationModule
  ]
})
export class AdminModule {

}
