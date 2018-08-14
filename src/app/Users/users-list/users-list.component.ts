import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../users.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit , OnDestroy {
  displayedColumns: string[] = [ 'username', 'email'];
userSub: Subscription;
 public  DataSource: any[] = [];
  constructor(public usersService: UsersService) { }

  ngOnInit() {
    console.log('First');

     this.usersService.getUsers();

   this.userSub = this.usersService.getUserListener().subscribe(userResponse => {
    console.log(userResponse);
     this.DataSource = userResponse.userList;
     console.log((this.DataSource));


    });
  }

  followMe(email, btnId) {

    btnId.innerHTML = 'Following';
    btnId.classList.remove('btn-success');
    btnId.classList.add('btn-default');
    this.usersService.follow(email);

  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
