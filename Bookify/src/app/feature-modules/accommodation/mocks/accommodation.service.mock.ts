import { Injectable } from "@angular/core";
import {GuestDTO} from "../../account/model/guest.dto";
import {Address} from "../../account/model/address";
import {Accommodation} from "../model/accommodation.model";

@Injectable()
export class AccommodationServiceMock {
  constructor() { }

  getTotalPrice(){
    return 80.0;
  }

  createReservationRequest(){
    return {
      created: new Date('2024-02-01'),
      start: new Date('2024-03-01'),
      end: new Date('2024-03-04'),
      guestNumber: 3,
      guest: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
      } as GuestDTO,
      accommodation: {
        id: 1,
        name: 'Example Accommodation',
        description: 'Accommodation description',
        minGuest: 2,
        maxGuest: 4,
        cancellationDeadline: 2,
        manual: false,
        filters: ['BAR'],
        accommodationType: 'HOTEL',
        pricePer: 'ROOM',
        address: {
          country: 'Example Country',
          city: 'Example City',
          address: 'Example Street 123',
          zipCode: '12345',
        } as Address,
      } as Accommodation,
      status: 'PENDING',
    }
  }
}
