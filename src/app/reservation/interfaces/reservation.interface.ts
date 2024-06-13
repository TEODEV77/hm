import { Hotel } from "../../admin/interfaces/hotel/hotel.interface";
import { Room } from "../../admin/interfaces/room/room.interface";
import { EmergencyContact } from "./emergency-contact.interface";
import { Guest } from "./guest.interface";

export interface Reservation {
  _id:               string;
  start_date:        string;
  end_date:          string;
  check_in:          string;
  check_out:         string;
  number_of_people:  number;
  total:             number;
  status:            string;
  hotel:             Hotel;
  room:              Room;
  guests:            Guest[];
  emergency_contact: EmergencyContact;
  __v:               number;
}

