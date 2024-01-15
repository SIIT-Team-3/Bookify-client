import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AccommodationService } from './accommodation.service';
import moment from "moment";
import {ReservationRequestDTO} from "./model/reservation-request.dto.model";
import {Reservation} from "./model/reservation.model";
import {GuestDTO} from "../account/model/guest.dto";
import {Accommodation} from "./model/accommodation.model";
import {Address} from "../account/model/address";

describe('AccommodationService', () => {
  let service: AccommodationService;
  let httpController: HttpTestingController;
  let url = 'http://localhost:8080/api/v1/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AccommodationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the total price', () => {
    const accommodationId = 1;
    const begin = new Date('2024-03-06');
    const end = new Date('2024-03-08');
    const pricePer = 'ROOM';
    const persons = 2;
    const expectedTotalPrice = 100;

    service.getTotalPrice(accommodationId, begin, end, pricePer, persons).subscribe((totalPrice) => {
      expect(totalPrice).toBe(expectedTotalPrice);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}accommodations/price?id=${accommodationId}&begin=${moment(begin).format('DD.MM.YYYY')}&end=${moment(end).format('DD.MM.YYYY')}&pricePer=${pricePer}&persons=${persons}`
    })

    req.flush(expectedTotalPrice);
  });

  it('should create a reservation request', () => {
    const reservation: ReservationRequestDTO = {
      created: new Date(),
      start: new Date('2024-03-01'),
      end: new Date('2024-03-04'),
      guestNumber: 2,
      price: 100
    };

    const accommodationId = 1;
    const guestId = 2;

    const expectedReservation: Reservation = {
      created: reservation.created,
      start: reservation.start,
      end: reservation.end,
      guestNumber: reservation.guestNumber,
      guest: {
        id: guestId,
        firstName: 'John',
        lastName: 'Doe',
      } as GuestDTO,
      accommodation: {
        id: accommodationId,
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
    };

    service.createReservationRequest(reservation, accommodationId, guestId).subscribe((createdReservation) => {
      expect(createdReservation).toEqual(expectedReservation);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}reservations/create?accommodationId=${accommodationId}&guestId=${guestId}`
    });

    req.flush(expectedReservation);
  });
});
