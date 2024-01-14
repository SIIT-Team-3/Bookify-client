import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatapickerRangeComponent } from './datapicker-range.component';
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";

describe('DatapickerRangeComponent', () => {
  let component: DatapickerRangeComponent;
  let fixture: ComponentFixture<DatapickerRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DatapickerRangeComponent]
    });

    fixture = TestBed.createComponent(DatapickerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values', () => {
    expect(component.fromDate).toBeDefined();
    expect(component.toDate).toBeDefined();
    expect(component.dateBegin).toBeDefined();
    expect(component.dateEnd).toBeDefined();
  });

  //onDateSelection
  it('should update fromDate and dateBegin', () => {
    const select = new NgbDate(2024, 10, 10);

    component.onDateSelection(select);

    expect(component.fromDate).toEqual(select);
    expect(component.dateBegin).toEqual('10.10.2024')
  });

  it('should update toDate and dateEnd', () => {
    const selectBegin = new NgbDate(2024, 10, 10);
    const select = new NgbDate(2024, 10, 12);

    component.onDateSelection(selectBegin);
    component.onDateSelection(select);

    expect(component.toDate).toEqual(select);
    expect(component.dateEnd).toEqual('12.10.2024')
  });

  it('should reset toDate and dateEnd when fromDate is set again', () => {
    const selectBegin = new NgbDate(2024, 10, 10);
    const selectEnd = new NgbDate(2024, 10, 12);
    const select = new NgbDate(2024, 11, 6);

    component.onDateSelection(selectBegin);
    component.onDateSelection(selectEnd);
    component.onDateSelection(select);

    expect(component.fromDate).toEqual(select);
    expect(component.dateBegin).toEqual('6.11.2024')
    expect(component.toDate).toBeNull();
    expect(component.dateEnd).toEqual('');
  });

  //setDate
  it('should set dates correctly', () => {
    const beginDate = '6.11.2024';
    const endDate = '12.11.2024';
    const begin = new NgbDate(2024, 11, 6);
    const end = new NgbDate(2024, 11, 12);

    component.setDate(beginDate, endDate);

    expect(component.dateBegin).toBe(beginDate);
    expect(component.dateEnd).toBe(endDate);
    expect(component.fromDate).toEqual(begin);
    expect(component.toDate).toEqual(end);
  });

  //isHovered
  it('should return true when hovered between fromDate and hoveredDate', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = null;
    component.hoveredDate = new NgbDate(2024, 10, 15);

    const result = component.isHovered(new NgbDate(2024, 10, 12));

    expect(result).toBe(true);
  });

  it('should return false when date is before fromDate', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = null;
    component.hoveredDate = new NgbDate(2024, 10, 15);

    const result = component.isHovered(new NgbDate(2024, 10, 5));

    expect(result).toBe(false);
  });

  it('should return false when date is after hoveredDate', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = null;
    component.hoveredDate = new NgbDate(2024, 10, 15);

    const result = component.isHovered(new NgbDate(2024, 10, 20));

    expect(result).toBe(false);
  });

  it('should return false when toDate is not null', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = new NgbDate(2024, 10, 15);
    component.hoveredDate = new NgbDate(2024, 10, 12);

    const result = component.isHovered(new NgbDate(2024, 10, 12));

    expect(result).toBe(false);
  });

  it('should return false when fromDate is null', () => {
    const result = component.isHovered(new NgbDate(2024, 10, 12));

    expect(result).toBe(false);
  });

  it('should return false when hoverDate is null', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = new NgbDate(2024, 10, 15);

    const result = component.isHovered(new NgbDate(2024, 10, 12));

    expect(result).toBe(false);
  });

  //isInside
  it('should return true when date is between fromDate and toDate', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = new NgbDate(2024, 10, 15);

    const result = component.isInside(new NgbDate(2024, 10, 12));

    expect(result).toBe(true);
  });

  it('should return false when toDate is null', () => {
    component.fromDate = new NgbDate(2024, 10, 10);

    const result = component.isInside(new NgbDate(2024, 10, 12));

    expect(result).toBe(false);
  });

  it('should return false when date is before fromDate', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = new NgbDate(2024, 10, 15);

    const result = component.isInside(new NgbDate(2024, 10, 5));

    expect(result).toBe(false);
  });

  it('should return false when date is after toDate', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = new NgbDate(2024, 10, 15);

    const result = component.isInside(new NgbDate(2024, 10, 20));

    expect(result).toBe(false);
  });

  //isRange
  it('should return true when date equals fromDate', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = new NgbDate(2024, 10, 15);

    const result = component.isRange(new NgbDate(2024, 10, 10));

    expect(result).toBe(true);
  });

  it('should return true when date equals toDate', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = new NgbDate(2024, 10, 15);

    const result = component.isRange(new NgbDate(2024, 10, 15));

    expect(result).toBe(true);
  });

  it('should return true when date is inside the range', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = new NgbDate(2024, 10, 15);

    const result = component.isRange(new NgbDate(2024, 10, 12));

    expect(result).toBe(true);
  });

  it('should return true when date is hovered', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = new NgbDate(2024, 10, 15);
    component.hoveredDate = new NgbDate(2024, 10, 12);

    const result = component.isRange(new NgbDate(2024, 10, 12));

    expect(result).toBe(true);
  });

  it('should return false when date is not in the range, not hovered, and not equal to fromDate or toDate', () => {
    component.fromDate = new NgbDate(2024, 10, 10);
    component.toDate = new NgbDate(2024, 10, 15);
    component.hoveredDate = new NgbDate(2024, 10, 12);

    const result = component.isRange(new NgbDate(2024, 10, 18));

    expect(result).toBe(false);
  });
});
