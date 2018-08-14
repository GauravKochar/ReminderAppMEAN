import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule,
  MatCardModule ,
  MatButtonModule, MatToolbarModule,
   MatExpansionModule, MatProgressSpinnerModule,
   MatPaginatorModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule,
   MatSelectModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatTableModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AddRemainderComponent } from './Reminders/add-remainder/add-remainder.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { ReminderListComponent } from './Reminders/reminder-list/reminder-list.component';
import { ViewReminderComponent } from './Reminders/view-reminder/view-reminder.component';
import { ChatComponent } from './chat/chat.component';
import { UsersListComponent } from './Users/users-list/users-list.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    AddRemainderComponent,
    ReminderListComponent,
    ViewReminderComponent,
    ChatComponent,
    UsersListComponent
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule ,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    AngularDateTimePickerModule,
    MatDialogModule ,
     MatTableModule


  ],
  entryComponents: [
    ViewReminderComponent

  ],
  providers: [{provide: HTTP_INTERCEPTORS , useClass : AuthInterceptor , multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
