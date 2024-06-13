import { Hotel } from "../hotel/hotel.interface";
import { Room } from "../room/room.interface";

export interface Accommodation {
  start_date: Date;
  end_date: Date;
  hotel: Hotel ;
  room: Room ;
  _id: string;
}
