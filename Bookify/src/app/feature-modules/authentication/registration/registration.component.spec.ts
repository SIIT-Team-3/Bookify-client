import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';

import { RegistrationComponent } from './registration.component';
import { AuthenticationService } from '../authentication.service';
import { Message } from '../model/message.dto.model';
import { Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    const message: Observable<Message> = of({
      token: 'token'
    });

    const countries: Promise<string[]> = new Promise<string[]>((resolve) => {
      setTimeout(() => {
        const countryArray: string[] = ['Serbia', 'Croatia', 'Montenegro'];
        resolve(countryArray);
      }, 1000);
    });

    const authenticationServiceSpy = jasmine.createSpyObj<AuthenticationService>(['register', 'getCountries']);
    authenticationServiceSpy.register.and.returnValue(message);
    authenticationServiceSpy.getCountries.and.returnValue(countries);

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonToggleModule, MatFormFieldModule, ReactiveFormsModule, RouterTestingModule, MatSnackBarModule],
      declarations: [RegistrationComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the register method', () => {
    spyOn(component, 'register');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid, empty', () => {
    component.form.controls['country'].setValue('');
    component.form.controls['city'].setValue('');
    component.form.controls['streetAddress'].setValue('');
    component.form.controls['zipCode'].setValue('');
    component.form.controls['email'].setValue('');
    component.form.controls['password'].setValue('');
    component.form.controls['confirmPassword'].setValue('');
    component.form.controls['firstName'].setValue('');
    component.form.controls['lastName'].setValue('');
    component.form.controls['phone'].setValue('');
    component.form.controls['role'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid, email pattern', () => {
    component.form.controls['country'].setValue('Serbia');
    component.form.controls['city'].setValue('Novi Sad');
    component.form.controls['streetAddress'].setValue('Ulica');
    component.form.controls['zipCode'].setValue('21000');
    component.form.controls['email'].setValue('test');
    component.form.controls['password'].setValue('Test123?');
    component.form.controls['confirmPassword'].setValue('Test123?');
    component.form.controls['firstName'].setValue('Ime');
    component.form.controls['lastName'].setValue('Prezime');
    component.form.controls['phone'].setValue('192');
    component.form.controls['role'].setValue('OWNER');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid, password pattern', () => {
    component.form.controls['country'].setValue('Serbia');
    component.form.controls['city'].setValue('Novi Sad');
    component.form.controls['streetAddress'].setValue('Ulica');
    component.form.controls['zipCode'].setValue('21000');
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('123');
    component.form.controls['confirmPassword'].setValue('123');
    component.form.controls['firstName'].setValue('Ime');
    component.form.controls['lastName'].setValue('Prezime');
    component.form.controls['phone'].setValue('192');
    component.form.controls['role'].setValue('OWNER');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid, passwords not same', () => {
    component.form.controls['country'].setValue('Serbia');
    component.form.controls['city'].setValue('Novi Sad');
    component.form.controls['streetAddress'].setValue('Ulica');
    component.form.controls['zipCode'].setValue('21000');
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('Test?123');
    component.form.controls['confirmPassword'].setValue('Test123?');
    component.form.controls['firstName'].setValue('Ime');
    component.form.controls['lastName'].setValue('Prezime');
    component.form.controls['phone'].setValue('192');
    component.form.controls['role'].setValue('OWNER');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid, phone pattern', () => {
    component.form.controls['country'].setValue('Serbia');
    component.form.controls['city'].setValue('Novi Sad');
    component.form.controls['streetAddress'].setValue('Ulica');
    component.form.controls['zipCode'].setValue('21000');
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('Test123?');
    component.form.controls['confirmPassword'].setValue('Test123?');
    component.form.controls['firstName'].setValue('Ime');
    component.form.controls['lastName'].setValue('Prezime');
    component.form.controls['phone'].setValue('1');
    component.form.controls['role'].setValue('OWNER');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.form.controls['country'].setValue('Serbia');
    component.form.controls['city'].setValue('Novi Sad');
    component.form.controls['streetAddress'].setValue('Ulica');
    component.form.controls['zipCode'].setValue('21000');
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('Test123?');
    component.form.controls['confirmPassword'].setValue('Test123?');
    component.form.controls['firstName'].setValue('Ime');
    component.form.controls['lastName'].setValue('Prezime');
    component.form.controls['phone'].setValue('192');
    component.form.controls['role'].setValue('OWNER');
    expect(component.form.valid).toBeTruthy();
  });
});
