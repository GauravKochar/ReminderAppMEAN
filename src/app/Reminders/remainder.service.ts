import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Reminder } from './reminder.model';

const BACKEND_URL = environment.apiUrl + '/reminder';

@Injectable({
  providedIn: 'root'
})
export class RemainderService  {

  constructor(private http: HttpClient) { }

  private remindersUpdated = new Subject<{reminderList: any}>();

  addRemainder(reminder) {
    reminder.userId = sessionStorage.getItem('username');
    this.http.post(BACKEND_URL + '/add', reminder).subscribe(response =>  {
     console.log('addRemainder', response);


 }, error => {

 });

  }
  deleteReminder(reminderId) {
    this.http.delete(BACKEND_URL + '/delete/' + reminderId).subscribe(response => {
      console.log('deleteReminder', response);
      this.getReminders();

    }, error => {

    });

  }
  updateReminder( reminderId , reminder) {
    reminder._id = reminderId;
    this.http.put(BACKEND_URL + '/update/' + reminderId, reminder).subscribe(response => {
      console.log('updateReminder', response);
      this.getReminders();

    }, error => {

    });


  }
  getReminder(reminderId: string) {
     return this.http.get<{reminder: any}>(BACKEND_URL + '/getReminder/' + reminderId);

  }

  getReminderUpdateListener() {
    return this.remindersUpdated.asObservable();

}

  getReminders() {
    this.http.get<{reminderList: any}>(BACKEND_URL + '/getList').subscribe(response =>  {
      console.log('getReminders', response);
      this.remindersUpdated.next(response);
}, error => {

});

  }


}
