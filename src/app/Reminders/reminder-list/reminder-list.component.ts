import { Component, OnInit , OnDestroy} from '@angular/core';
import { RemainderService } from '../remainder.service';
import { Subscription } from '../../../../node_modules/rxjs';
import {MatDialog} from '@angular/material';

import { ParamMap, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ViewReminderComponent } from '../view-reminder/view-reminder.component';


@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit , OnDestroy {
  reminders = [];
  private remindersSub: Subscription;
  selectedValue: string;
  startDate: Date ;
  endDate: Date ;
  title: string;
  Description: string;
  reminderId: string;

  constructor(public reminderService: RemainderService, public dialog: MatDialog, public route: ActivatedRoute) { }

  ngOnInit() {
this.reminderService.getReminders();
this.remindersSub = this.reminderService.getReminderUpdateListener().subscribe(response => {
  this.reminders = response.reminderList;
  console.log(this.reminders);

});
  }

  ngOnDestroy() {
    this.remindersSub.unsubscribe() ;

  }

  OnDelete(reminderId: string) {

    this.reminderService.deleteReminder(reminderId);


  }



}

