import { Hotel } from "../hotel/hotel.interface";
import { Room } from "../room/room.interface";

export interface AccommodationDetailsDto {
  start_date: string;
  end_date: string;
  hotel: Hotel
  room: Room;

}
