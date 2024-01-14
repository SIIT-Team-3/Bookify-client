import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReserveComponent } from './reserve.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { DatapickerRangeComponent } from '../../../layout/datapicker-range/datapicker-range.component';

describe('ReserveComponent', () => {
  let component: ReserveComponent;
  let fixture: ComponentFixture<ReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveComponent],
      imports: [FormsModule, BrowserAnimationsModule, DatapickerRangeComponent],
      providers: [MatDialog, DatePipe],
    });

    fixture = TestBed.createComponent(ReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Reservation component', () => {
    expect(component).toBeTruthy();
  });

  it('should set default value for persons to 2', () => {
    expect(component.persons).toBe(2);
  });

  it('should update persons when input changes', () => {
    const newPersons = 4;
    component.persons = newPersons;
    expect(component.persons).toBe(newPersons);
  });

  it('should emit buttonPressed event with correct values when onReservePress is called', () => {
    spyOn(component.buttonPressed, 'emit');

    component.dateComponent.dateBegin = '01.10.2024';
    component.dateComponent.dateEnd = '05.10.2024';
    component.persons = 3;

    component.onReservePress();

    expect(component.buttonPressed.emit).toHaveBeenCalledWith({
      persons: 3,
      dateBegin: '10-01-2024',
      dateEnd: '10-05-2024',
    });
  });
});
