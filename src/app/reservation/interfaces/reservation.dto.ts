import { EmergencyContact } from "./emergency-contact.interface";
import { Guest } from "./guest.interface";

export interface ReservationDto {
  start_date:        string;
  end_date:          string;
  check_in:          string;
  check_out:         string;
  number_of_people:  number;
  guests:            Guest[];
  emergency_contact: EmergencyContact;
}




