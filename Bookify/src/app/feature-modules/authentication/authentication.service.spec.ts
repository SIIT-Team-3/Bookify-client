import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Address } from '../accommodation/model/address.dto.model';
import { UserRegistrationDTO } from './model/user.registration.dto.model';
import { Message } from './model/message.dto.model';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpController: HttpTestingController;

  let url = 'http://localhost:8080/api/v1/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthenticationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call register and return an Message', () => {
    const address: Address = {
      country: 'Serbia',
      city: 'Novi Sad',
      address: 'Ulica',
      zipCode: '21000'
    };
    const user: UserRegistrationDTO = {
      email: 'test@test.com',
      password: 'Test123?',
      confirmPassword: 'Test123?',
      firstName: 'Ime',
      lastName: 'Prezime',
      address: address,
      phone: '192',
      role: 'GUEST'
    };

    const message: Message = {
      token: 'token'
    }

    service.register(user).subscribe((res) => {

      expect(res).toEqual(message);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}`,
    });

    req.flush(message);
  });
});
