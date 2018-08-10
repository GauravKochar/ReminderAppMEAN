import { Component , OnInit, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
 import {AuthService} from '../auth.service';
import { Subscription } from 'rxjs';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component(
  {

    templateUrl: './login.component.html',
     styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit , OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;
    constructor(public authService: AuthService,
      public dialogRef: MatDialogRef<LoginComponent>
     ) {}



    ngOnInit() {
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe( authStatus => {
        console.log('signup' + authStatus);
       this.isLoading = false;
      });
       }
    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }
    onLogin(form: NgForm)  {

        if ( form.invalid)   {
          return;
        }
        this.dialogRef.close();
        this.authService.login(form.value.email, form.value.password);
    }

    googleSignup() {
      this.authService.signInWithGoogle();

    }

}
