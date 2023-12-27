import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnerDTO } from './model/owner.model.dto';
import { environment } from '../../../env/env';
import { RatingDTO } from './model/rating.model.dto';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient, @Inject(LOCALE_ID) private locale: string) { }

  getOwnerDTO(ownerId: number): Observable<OwnerDTO>{
    return this.httpClient.get<OwnerDTO>(environment.apiUser + "/owner/" + ownerId);
  }

  getOwnerRating(ownerId: number): Observable<RatingDTO>{
    return this.httpClient.get<RatingDTO>(environment.apiReview + "/owner/" + ownerId + "/rating");
  }
}
