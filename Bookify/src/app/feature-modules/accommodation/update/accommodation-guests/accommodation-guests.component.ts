import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccommodationGuestsFormModel } from '../../model/accommodation-guests.form.model';

@Component({
  selector: 'app-accommodation-guests',
  templateUrl: './accommodation-guests.component.html',
  styleUrl: './accommodation-guests.component.css'
})
export class AccommodationGuestsComponent implements OnChanges, OnInit {
  @Output() guestsChanged = new EventEmitter<AccommodationGuestsFormModel>();
  @Input() submitted: boolean = false;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      minGuests: ['', Validators.required],
      maxGuests: ['', [Validators.required, this.maxValidator]],
      reservationAcceptance: ['', Validators.required]
    });
    this.form.valueChanges.subscribe(value => {
      this.onGuestsChange();
    })
  }

  get maxValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(!this.form){
        return null;
      }
      const min = this.form.get('minGuests')?.value;
      const max = control.value;
      if (max < min) {
        return { lessThen: true, message: 'Max cannot be less then min' };
      }

      return null;
    };
  }


  ngOnInit(): void {
    this.form.get('reservationAcceptance')?.setValue("manual");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.submitted) {
      this.form.markAllAsTouched();
    }
  }

  onGuestsChange() {
    this.guestsChanged.emit({
      type: this.form.get('type')?.value,
      minGuests: this.form.get('minGuests')?.value,
      maxGuests: this.form.get('maxGuests')?.value,
      reservationAcceptance: this.form.get('reservationAcceptance')?.value
    });
  }
}
