import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {AccountModule} from "../feature-modules/account/account.module";
import {RouterModule} from "@angular/router";
import { NavigationGuestComponent } from './navigation-guest/navigation-guest.component';
import { NavigationAdminComponent } from './navigation-admin/navigation-admin.component';
import { NavigationOwnerComponent } from './navigation-owner/navigation-owner.component';


@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationGuestComponent,
    NavigationAdminComponent,
    NavigationOwnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    AccountModule,
    RouterModule
  ],
  exports: [
    NavigationBarComponent
  ]
})
export class LayoutModule { }
