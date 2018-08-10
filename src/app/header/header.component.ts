
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { AuthService} from '../auth/auth.service';
import {MatDialog} from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';

@Component(
  {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService, public dialog: MatDialog)  {

  }
  ngOnInit() {
    this.authService.autoAuthUser();
      this.userIsAuthenticated = this.authService.getIsAuth();

    this.authListenerSubs =  this.authService.getAuthStatusListener().subscribe(isAuthenticated =>     {

      this.userIsAuthenticated = isAuthenticated;
    }) ;

  }
  ngOnDestroy()  {
    this.authListenerSubs.unsubscribe();

  }
  onLogout()  {
    this.authService.logout();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    });
  }
}
