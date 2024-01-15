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

  it('should call openReservationDialog if accommodation is available', fakeAsync(() => {
    const mockData = 100.0;
    accommodationServiceSpy.getTotalPrice.and.returnValue(of(mockData));

    const openReservationDialogSpy = spyOn(component, 'openReservationDialog');

    component.openDialog(1, new Date('2024-03-06'), new Date('2024-03-08'), 2, "ROOM");

    tick();

    expect(openReservationDialogSpy).toHaveBeenCalledWith(1, new Date('2024-03-06'), new Date('2024-03-08'), 2, mockData);
  }));
});
