import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationComponent } from './user-information.component';
import {AccountModule} from "../account.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

describe('UserInformationComponent', () => {
  let component: UserInformationComponent;
  let fixture: ComponentFixture<UserInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInformationComponent],
      imports: [AccountModule, FormsModule, ReactiveFormsModule, BrowserModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserInformationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('fields on edit should be disabled', () => {
    component.userInfoForm.controls['firstname'].setValue('');
    component.userInfoForm.controls['lastname'].setValue('');
    component.userInfoForm.controls['city'].setValue('');
    component.userInfoForm.controls['address'].setValue('');
    component.userInfoForm.controls['zipcode'].setValue('');
    component.userInfoForm.controls['phone'].setValue('');
    component.userInfoForm.controls['country'].setValue('');
    expect(component.userInfoForm.valid).toBeFalsy();
  });



});
