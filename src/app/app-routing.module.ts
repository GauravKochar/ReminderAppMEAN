import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { Routes, RouterModule} from '@angular/router';
import { AddRemainderComponent } from './Reminders/add-remainder/add-remainder.component';
import { ReminderListComponent } from './Reminders/reminder-list/reminder-list.component';
import { ViewReminderComponent } from './Reminders/view-reminder/view-reminder.component';
import { ChatComponent } from './chat/chat.component';
import { UsersListComponent } from './Users/users-list/users-list.component';
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'addReminder' , component: AddRemainderComponent },
    { path: 'edit/:id' , component: AddRemainderComponent },
     {path: 'reminderList' , component: ReminderListComponent },
    {path: 'view/:id' , component: ViewReminderComponent },
    {path: 'chat' , component: ChatComponent },
    {path: 'Users' , component: UsersListComponent }


];

 @NgModule({
  imports: [ RouterModule.forRoot(routes) ], /* need to tell our router module abput the routes*/
  exports: [ RouterModule ]

})


export class AppRoutingModule {


 }
