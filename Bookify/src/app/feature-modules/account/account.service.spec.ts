import {TestBed} from '@angular/core/testing';

import {AccountService} from './account.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {account1, account3} from "./mocks/accounts.mock";
import {environment} from "../../../env/env";

describe('AccountService', () => {
  let service: AccountService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AccountService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUser and return account1 from account.mocks.ts', () => {
    const userId = 1;
    service.getUser(userId).subscribe((res) => {
      expect(res).toEqual(account1);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: environment.apiHost + "users/" + userId
    });
    req.flush(account1);
  });

  it('should call updateUser and return updated account (account2 from account.mocks.ts)', ()=>{
    service.updateUser(account3).subscribe((res) => {
      expect(res).toEqual(account3);
    });
    const req = httpController.expectOne({
      method: 'PUT',
      url: environment.apiHost + "users",
    });
    req.flush(account3);
  });


});
