import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AccommodationPageComponent } from './accommodation-page.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AccountService} from "../../account/account.service";
import {AccommodationService} from "../accommodation.service";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {AuthenticationService} from "../../authentication/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";
import {CarouselComponent} from "../carousel/carousel.component";
import {MapComponent} from "../../../shared/map/map.component";
import {HttpClientModule} from "@angular/common/http";
import {ReserveComponent} from "../reserve/reserve.component";
import {DatapickerRangeComponent} from "../../../layout/datapicker-range/datapicker-range.component";
import {FormsModule} from "@angular/forms";
import {MessageDialogComponent} from "../../../layout/message-dialog/message-dialog.component";
import {ReservationDialogComponent} from "../../../layout/reservation-dialog/reservation-dialog.component";
import {By} from "@angular/platform-browser";

describe('AccommodationPageComponent', () => {
  let component: AccommodationPageComponent;
  let fixture: ComponentFixture<AccommodationPageComponent>;
  let matDialogOpenSpy: jasmine.Spy;
  let accommodationServiceSpy: jasmine.SpyObj<AccommodationService>;

  beforeEach(() => {
    matDialogOpenSpy = jasmine.createSpy('open');
    accommodationServiceSpy = jasmine.createSpyObj('AccommodationService', ['getTotalPrice', 'createReservationRequest']);

    TestBed.configureTestingModule({
      declarations: [AccommodationPageComponent, MapComponent, ReserveComponent],
      imports: [CarouselComponent, HttpClientModule, DatapickerRangeComponent, RouterModule, FormsModule],
      providers: [
        { provide: MatDialog, useValue: { open: matDialogOpenSpy } },
        { provide: AccommodationService, useValue: accommodationServiceSpy },
        { provide: AuthenticationService, useValue: { getRole: () => 'GUEST' } },
        { provide: ActivatedRoute, useValue: { params: of({ accommodationId: 1 }) } },
        { provide: AccountService, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(AccommodationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should open message dialog if accommodation is not available", fakeAsync(() => {
    accommodationServiceSpy.getTotalPrice.and.returnValue(of(-1));
    component.openDialog(1, new Date(124, 2, 1), new Date(124, 2, 5), 2, "ROOM");

    tick();

    expect(matDialogOpenSpy).toHaveBeenCalledWith(
      MessageDialogComponent,
      jasmine.objectContaining({
        data: { message: "Accommodation it not available for this parameters." },
      })
    );

    expect(accommodationServiceSpy.createReservationRequest).not.toHaveBeenCalled();
  }));

  // it('should open ReservationDialog if accommodation is available', fakeAsync(() => {
  //   // Arrange
  //   const fakeTotalPrice = 80.0;
  //   accommodationServiceSpy.getTotalPrice.and.returnValue(of(fakeTotalPrice));
  //
  //   // Act
  //   component.openDialog(1, new Date(124, 3, 6), new Date(124, 3, 8), 2, "ROOM");
  //   tick();
  //
  //   // Assert
  //   expect(accommodationServiceSpy.getTotalPrice).toHaveBeenCalledWith(1, jasmine.any(Date), jasmine.any(Date), 'ROOM', 2);
  //
  //   // Wait for the asynchronous behavior to complete
  //   fixture.detectChanges();
  //   tick();
  //
  //   // Assert the dialog opening
  //   expect(matDialogOpenSpy).toHaveBeenCalledWith(ReservationDialogComponent, jasmine.objectContaining({
  //     data: { message: `Total cost for this reservation is ${fakeTotalPrice} EUR.` },
  //   }));
  //
  //   expect(accommodationServiceSpy.createReservationRequest).not.toHaveBeenCalled();
  // }));


  // it('should open ReservationDialog if accommodation is available', fakeAsync(() => {
  //   accommodationServiceSpy.getTotalPrice.and.returnValue(of(80.0));
  //   matDialogOpenSpy.and.returnValue({
  //     afterClosed: () => of(true),
  //   });
  //
  //   component.openDialog(1, new Date(124, 3, 1), new Date(124, 3, 5), 2, "ROOM");
  //   tick();
  //
  //
  //   expect(matDialogOpenSpy).toHaveBeenCalledWith(ReservationDialogComponent, jasmine.objectContaining({
  //     data: { message: `Total cost for this reservation is 80.0 EUR.` },
  //   }));
  //   // expect(accommodationServiceSpy.createReservationRequest).not.toHaveBeenCalled();
  //
  //   // matDialogOpenSpy.calls.mostRecent().returnValue.afterClosed().next(true);
  //   // tick();
  //   //
  //   // // Assert additional actions after user confirms reservation
  //   // expect(accommodationServiceSpy.createReservationRequest).toHaveBeenCalledOnceWith(
  //   //   jasmine.objectContaining({
  //   //     guestNumber: 2,
  //   //     price: Math.round(fakeTotalPrice * 100) / 100,
  //   //   }),
  //   //   1,
  //   //   jasmine.any(String)
  //   // );
  // }));

  // it("should open reservation dialog if accommodation is available", fakeAsync(() => {
  //   accommodationServiceSpy.getTotalPrice.and.returnValue(of(80.0));
  //   component.openDialog(1, new Date(2024, 3, 6), new Date(2024, 3, 8), 2, "ROOM");
  //
  //   tick();
  //
  //   expect(matDialogOpenSpy).toHaveBeenCalledWith(
  //     ReservationDialogComponent,
  //     jasmine.objectContaining({
  //       data: { message: "Total cost for this reservation is 80.0 EUR." },
  //     })
  //   );
  //
  //   // expect(accommodationServiceSpy.createReservationRequest).toHaveBeenCalledOnceWith(
  //   //   jasmine.objectContaining({
  //   //     guestNumber: 2,
  //   //     price: 80.0,
  //   //   }),
  //   //   1,
  //   //   jasmine.any(String)
  //   // );
  // }));
});
