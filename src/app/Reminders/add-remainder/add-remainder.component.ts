import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RemainderService } from '../remainder.service';
import { ActivatedRoute, ParamMap } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-remainder',
  templateUrl: './add-remainder.component.html',
  styleUrls: ['./add-remainder.component.css']
})
export class AddRemainderComponent implements OnInit {

  private mode = 'create';
  private reminderId: string;
  selectedValue: string;
   startDate: Date = new Date();
   endDate: Date = new Date();
   title: string;
   Description: string;

    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm a',
        defaultOpen: false,
        closeOnSelect: false
    };

  constructor(public remainderService: RemainderService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('id')) {

        this.mode = 'edit';
        this.reminderId = paramMap.get('id');
        this.remainderService.getReminder(this.reminderId).subscribe(ReminderData => {
          console.log ('ReminderData', ReminderData);

    // const dateControl = document.querySelector('input[type="datetime-local"]');
    // dateControl.value = '2018-08-07T23:36:00.000Z';
          this.selectedValue = ReminderData.reminder.remainderType;
            this.startDate =  ReminderData.reminder.startDate;
             this.endDate = ReminderData.reminder.endDate;
             this.title = ReminderData.reminder.title;
             this.Description = ReminderData.reminder.description;

        });

      }  else {
        this.mode = 'create';
        this.reminderId = null;
      }

    });

  }
  onSave(form: NgForm) {
    if (form.invalid) {
      return ;
    }

console.log(this.startDate , this.endDate);
    const reminder = {
      title: form.value.title,
      description : form.value.Description,
      startDate: form.value.startDate,
      remainderType: this.selectedValue,
      endDate: form.value.endDate



    };
    console.log(reminder);
    if (this.mode === 'create') {
      this.remainderService.addRemainder(reminder);


    } else {

      this.remainderService.updateReminder(this.reminderId, reminder);
    }
    form.reset();

  }

}
