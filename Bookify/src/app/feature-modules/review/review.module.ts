import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { MaterialModule } from "../../infrastructure/material/material.module";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';
import { RatingsComponent } from './ratings/ratings.component';
import { CommentsRatingsComponent } from './comments-ratings/comments-ratings.component';
import { OwnerPageComponent } from './owner-page/owner-page.component';
import { OwnerInfoComponent } from './owner-info/owner-info.component';
import { ReportComponent } from './report/report.component';
import { ReportGuestComponent } from './report-guest/report-guest.component';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { AccommodationNewReviewComponent } from './accommodation-new-review/accommodation-new-review.component';

@NgModule({
  declarations: [
    NewCommentComponent,
    CommentComponent,
    RatingsComponent,
    CommentsRatingsComponent,
    OwnerPageComponent,
    OwnerInfoComponent,
    ReportComponent,
    ReportGuestComponent,
    GuestPageComponent,
    AccommodationNewReviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NewCommentComponent,
    CommentComponent,
    RatingsComponent,
    CommentsRatingsComponent,
    OwnerPageComponent,
    AccommodationNewReviewComponent
  ]
})
export class ReviewModule { }
