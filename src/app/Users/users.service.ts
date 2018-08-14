import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';
import { Http } from '@angular/http';
import { Subject } from '../../../node_modules/rxjs';
const BACKEND_URL = environment.apiUrl + '/user';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private userListener = new Subject<{userList: any}>();

  constructor(public authService: AuthService, public http: Http) { }

  getUserListener() {
    return this.userListener.asObservable();
  }

  getUsers() {
    this.http.get(BACKEND_URL + '/getUserList').subscribe(response =>  {
    //  console.log('getusers', JSON.parse(response._body) );
       this.userListener.next(JSON.parse(response._body));
}, error => {

});

  }

follow(email) {

this.http.post(BACKEND_URL + '/following', {email: email} ).subscribe(response => {
  console.log(response);

});

  }

}
