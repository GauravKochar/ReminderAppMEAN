
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

    @NgModule({

    declarations: [
     LoginComponent,
    SignupComponent
        ],
      imports: [
      CommonModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      FormsModule,
      RouterModule ,
        ]
    })
export class AuthModule {

}
