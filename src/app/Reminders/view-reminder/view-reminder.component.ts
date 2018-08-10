import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { RemainderService } from '../remainder.service';

@Component({
  selector: 'app-view-reminder',
  templateUrl: './view-reminder.component.html',
  styleUrls: ['./view-reminder.component.css']
})
export class ViewReminderComponent implements OnInit {

  reminderId: any;

  data: any = null;

  constructor(public route: ActivatedRoute ,  public reminderService: RemainderService) { }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('id')) {
        this.reminderId = paramMap.get('id');
        this.reminderService.getReminder(this.reminderId).subscribe(ReminderData => {
          console.log ('ReminderData', ReminderData.reminder);
          this.data = ReminderData;

        });

      }

    });



  }

}
