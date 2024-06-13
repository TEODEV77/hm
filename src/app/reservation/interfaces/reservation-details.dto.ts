import { Hotel } from "../../admin/interfaces/hotel/hotel.interface";
import { Room } from "../../admin/interfaces/room/room.interface";

export interface ReservationDetailsDto {
  start_date: string;
  end_date: string;
  room: Room;
  hotel: Hotel;
}
