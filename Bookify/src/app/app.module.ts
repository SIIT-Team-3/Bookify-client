import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';
import { AccommodationModule } from './feature-modules/accommodation/accommodation.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from "./layout/layout.module";
import { AccommodationBasicComponent } from './feature-modules/accommodation/accommodation-basic/accommodation-basic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { FilterComponent } from './layout/filter/filter.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { MatInputModule } from "@angular/material/input";
import { SearchComponent } from './layout/search/search.component';
import { ResultsPageComponent } from './feature-modules/accommodation/results-page/results-page.component';
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AccommodationPageComponent } from './feature-modules/accommodation/accommodation-page/accommodation-page.component';
import { ReserveComponent } from './feature-modules/accommodation/reserve/reserve.component';
import { LandingPageComponent } from './feature-modules/accommodation/landing-page/landing-page.component';
import { TopDestinationComponent } from './layout/top-destination/top-destination.component';
import { TopAccommodationComponent } from './layout/top-accommodation/top-accommodation.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthenticationModule } from './feature-modules/authentication/authentication.module';
import { MatFormFieldModule } from '@angular/material/form-field'
import {CarouselComponent} from "./feature-modules/accommodation/carousel/carousel.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DatapickerRangeComponent} from "./layout/datapicker-range/datapicker-range.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import {AccountModule} from "./feature-modules/account/account.module";
import {Interceptor} from "./feature-modules/authentication/interceptor/interceptor";

@NgModule({
  declarations: [
    AppComponent,
    AccommodationBasicComponent,
    FilterComponent,
    SearchComponent,
    ResultsPageComponent,
    AccommodationPageComponent,
    ReserveComponent,
    LandingPageComponent,
    TopDestinationComponent,
    TopAccommodationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AccountModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    AuthenticationModule,
    MatFormFieldModule,
    CarouselComponent,
    NgbModule,
    HttpClientModule,
    DatapickerRangeComponent,
    FormsModule,
    AccommodationModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    provideClientHydration(withNoHttpTransferCache()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
