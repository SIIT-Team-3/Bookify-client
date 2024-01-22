import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import {UserInformationComponent} from './user-information.component';
import {AccountModule} from "../account.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule, By} from "@angular/platform-browser";
import {AccountService} from "../account.service";
import {AuthenticationService} from "../../authentication/authentication.service";
import {of} from "rxjs";
import {account1, account2, account3} from "../mocks/accounts.mock";
import {Router, RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MessageDialogComponent} from "../../../layout/message-dialog/message-dialog.component";
import {MatDialogRef} from "@angular/material/dialog";

describe('UserInformationComponent', () => {
  let component: UserInformationComponent;
  let fixture: ComponentFixture<UserInformationComponent>;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj<AccountService>(AccountService.name, {
      'getUser': of(account1),
      'getAccountImage': of(),
      'updateUser': of(account3)
    });
    authServiceSpy = jasmine.createSpyObj<AuthenticationService>(AuthenticationService.name, {
      'getUserId': 1,
      'getCountries': Promise.resolve(['Serbia'])
    });

    await TestBed.configureTestingModule({
      declarations: [UserInformationComponent],
      imports: [AccountModule, FormsModule, ReactiveFormsModule, BrowserModule, HttpClientModule, RouterModule],
      providers: [
        {provide: AuthenticationService, useValue: authServiceSpy},
        {provide: AccountService, useValue: accountServiceSpy}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserInformationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load the user into the form', async () => {
    fixture.detectChanges();
    expect(accountServiceSpy.getUser).toHaveBeenCalledTimes(1);
    expect(component.account).toBe(account1);
    expect(component.userInfoForm.controls['firstname'].value).toEqual('Pera');
    expect(component.userInfoForm.controls['lastname'].value).toEqual('Peric');
    expect(component.userInfoForm.controls['city'].value).toEqual('Belgrade');
    expect(component.userInfoForm.controls['address'].value).toEqual('Svetog Save 37');
    expect(component.userInfoForm.controls['zipcode'].value).toEqual('11000');
    expect(component.userInfoForm.controls['phone'].value).toEqual('+381621303');
    expect(component.userInfoForm.controls['country'].value).toEqual('Serbia');

  });

  it('all fields should be disabled at first, cancel and save buttons should be disabled', () => {
    const editButton = fixture.debugElement.query(By.css('#edit-button')).nativeElement;
    const saveButton = fixture.debugElement.query(By.css('#save-button')).nativeElement;
    const cancelButton = fixture.debugElement.query(By.css('#cancel-button')).nativeElement;
    for (let controlName in component.userInfoForm.controls) {
      expect(component.userInfoForm.controls[controlName].disabled).toBeTruthy();
    }
    expect(editButton.disabled).toBeFalsy();
    expect(saveButton.disabled).toBeTruthy();
    expect(cancelButton.disabled).toBeTruthy();
  });

  it('all fields should be enabled, edit button should be disabled and cancel and save should be enabled', () => {
    fixture.debugElement.query(By.css("#edit-button")).triggerEventHandler("click", null);
    const saveButton = fixture.debugElement.query(By.css('#save-button')).nativeElement;
    const cancelButton = fixture.debugElement.query(By.css('#cancel-button')).nativeElement;
    const editButton = fixture.debugElement.query(By.css('#edit-button')).nativeElement;
    fixture.detectChanges();
    expect(component.userInfoForm.controls['firstname'].disabled).toBeFalsy();
    expect(component.userInfoForm.controls['lastname'].disabled).toBeFalsy();
    expect(component.userInfoForm.controls['city'].disabled).toBeFalsy();
    expect(component.userInfoForm.controls['address'].disabled).toBeFalsy();
    expect(component.userInfoForm.controls['zipcode'].disabled).toBeFalsy();
    expect(component.userInfoForm.controls['phone'].disabled).toBeFalsy();
    expect(component.userInfoForm.controls['country'].disabled).toBeFalsy();
    expect(editButton.disabled).toBeTruthy();
    expect(saveButton.disabled).toBeFalsy();
    expect(cancelButton.disabled).toBeFalsy();
  });

  it('invalid fields input, update user should not be called', () => {
    spyOn(component.dialog, 'open')
      .and
      .returnValue({afterClosed: () => of(true)} as MatDialogRef<any>);
    fixture.debugElement.query(By.css("#edit-button")).triggerEventHandler("click", null);
    fixture.detectChanges();
    component.userInfoForm.controls['firstname'].setValue('');
    component.userInfoForm.controls['lastname'].setValue('');
    component.userInfoForm.controls['city'].setValue('');
    component.userInfoForm.controls['address'].setValue('');
    component.userInfoForm.controls['zipcode'].setValue('');
    component.userInfoForm.controls['phone'].setValue('');
    component.userInfoForm.controls['country'].setValue('');
    expect(component.userInfoForm.valid).toBeFalsy();
    fixture.debugElement.query(By.css("#save-button")).triggerEventHandler("click", null);
    expect(accountServiceSpy.updateUser).toHaveBeenCalledTimes(0);
    expect(component.dialog.open).toHaveBeenCalledTimes(0);
  });

  it('valid fields input, cancel should be called and fields rollback', () => {
    spyOn(component.dialog, 'open')
      .and
      .returnValue({afterClosed: () => of(true)} as MatDialogRef<any>);
    fixture.debugElement.query(By.css("#edit-button")).triggerEventHandler("click", null);
    fixture.detectChanges();
    component.userInfoForm.controls['firstname'].setValue(account3.firstName);
    component.userInfoForm.controls['lastname'].setValue(account3.lastName);
    component.userInfoForm.controls['city'].setValue(account3.address?.city);
    component.userInfoForm.controls['address'].setValue(account3.address?.address);
    component.userInfoForm.controls['zipcode'].setValue(account3.address?.zipCode);
    component.userInfoForm.controls['phone'].setValue(account3.phone);
    component.userInfoForm.controls['country'].setValue(account3.address?.country);
    expect(component.userInfoForm.valid).toBeTruthy();
    fixture.debugElement.query(By.css("#cancel-button")).triggerEventHandler("click", null);
    expect(accountServiceSpy.updateUser).toHaveBeenCalledTimes(0);
    expect(component.dialog.open).toHaveBeenCalledTimes(0);
    expect(component.account).toEqual(account1);
    expect(component.userInfoForm.controls['firstname'].value).toEqual('Pera');
    expect(component.userInfoForm.controls['lastname'].value).toEqual('Peric');
    expect(component.userInfoForm.controls['city'].value).toEqual('Belgrade');
    expect(component.userInfoForm.controls['address'].value).toEqual('Svetog Save 37');
    expect(component.userInfoForm.controls['zipcode'].value).toEqual('11000');
    expect(component.userInfoForm.controls['phone'].value).toEqual('+381621303');
    expect(component.userInfoForm.controls['country'].value).toEqual('Serbia');
  });

  it('valid fields input, update user should be called and fields updated and dialog opened', () => {
    spyOn(component.dialog, 'open')
      .and
      .returnValue({afterClosed: () => of(true)} as MatDialogRef<any>);
    fixture.debugElement.query(By.css("#edit-button")).triggerEventHandler("click", null);
    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('#save-button')).nativeElement;
    const cancelButton = fixture.debugElement.query(By.css('#cancel-button')).nativeElement;
    const editButton = fixture.debugElement.query(By.css('#edit-button')).nativeElement;
    component.userInfoForm.controls['firstname'].setValue(account3.firstName);
    component.userInfoForm.controls['lastname'].setValue(account3.lastName);
    component.userInfoForm.controls['city'].setValue(account3.address?.city);
    component.userInfoForm.controls['address'].setValue(account3.address?.address);
    component.userInfoForm.controls['zipcode'].setValue(account3.address?.zipCode);
    component.userInfoForm.controls['phone'].setValue(account3.phone);
    component.userInfoForm.controls['country'].setValue(account3.address?.country);
    expect(component.userInfoForm.valid).toBeTruthy();
    fixture.debugElement.query(By.css("#save-button")).triggerEventHandler("click", null);
    expect(component.dialog.open).toHaveBeenCalledWith(MessageDialogComponent, {data: {message: 'User information changed successfully!'}});
    fixture.detectChanges();
    expect(accountServiceSpy.updateUser).toHaveBeenCalledTimes(1);
    expect(component.account).toEqual(account3);
    expect(component.userInfoForm.controls['firstname'].value).toEqual('Teodor');
    expect(component.userInfoForm.controls['lastname'].value).toEqual('Teodorovic');
    expect(component.userInfoForm.controls['city'].value).toEqual('Novi Sad');
    expect(component.userInfoForm.controls['address'].value).toEqual('Trg Dositeja Obradovica 6');
    expect(component.userInfoForm.controls['zipcode'].value).toEqual('11000');
    expect(component.userInfoForm.controls['phone'].value).toEqual('+381655555');
    expect(component.userInfoForm.controls['country'].value).toEqual('Serbia');
    expect(saveButton.disabled).toBeTruthy();
    expect(cancelButton.disabled).toBeTruthy();
    expect(editButton.disabled).toBeFalsy();
  });
});
