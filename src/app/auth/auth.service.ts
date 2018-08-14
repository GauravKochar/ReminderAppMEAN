import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthData} from './auth-data.model';
import {Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private tokenTimer:  any;
  private userId: string;

    private token;
    private authStatusListener = new Subject<boolean>();

  constructor (private http: HttpClient, private router: Router) {}

    getAuthStatusListener()     {
        return this.authStatusListener.asObservable();
    }

  createUser(email: string , password: string, username: string)   {
      const authData: AuthData = {
          email: email,
          password: password,
          username: username
      };
    this.http.post(BACKEND_URL + '/signup', authData).subscribe(() => {

    // console.log();
     this.router.navigate(['/']);

  }, error => {
    this.authStatusListener.next(false);
  });

  }
  getUserId()  {
      return localStorage.getItem('userId');
  }

    getToken()     {
        return localStorage.getItem('token');
    }
      getIsAuth()      {
return this.isAuthenticated;
      }

  login(email: string , password: string )   {
       const authData: any = {
          email: email ,
          password: password
      };
       console.log(authData);
       this.http.post<{token: string , expiresIn: number, userId: string } >(
         BACKEND_URL + '/login',
        authData).subscribe( response =>  {
          this.token = response.token;
          console.log(this.token);
          if (this.token)        {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            console.log(now);
            const expirationDate = new Date(now.getTime() +  expiresInDuration * 1000);
            console.log(expirationDate);

            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            this.saveAuthData(this.token , expirationDate, this.userId);
            this.router.navigate(['/addReminder']);
            console.log('yha arar hai');

          }

          console.log(response);


    }, error => {
      this.authStatusListener.next(false);

    });
}



private saveAuthData(token: string , expirationDate: Date , userId: string) {

  localStorage.setItem('token' , token);
  localStorage.setItem('expiration', expirationDate.toISOString());
  localStorage.setItem('userId' , userId);

}
private  clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('userId');


}
private setAuthTimer(duration: number) {
  console.log(duration);

  this.tokenTimer = setTimeout(() => {
    this.logout();
}, duration * 1000);


}
autoAuthUser() {
  const authInformation = this.getAuthData() ;

  if (!authInformation)   {
    return ;
  }


  const now = new Date();
  this.userId = authInformation.userId;
  const expiresIn = authInformation.expirationDate.getTime() - now.getTime() ;
  if ( expiresIn >  0)  {
    this.token = authInformation.token;
    this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);

  }


}

private getAuthData() {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expiration');
  const userId = localStorage.getItem('userId');

  if (!token || ! expirationDate )  {
    return;
  }
  return {
    token: token,
    expirationDate: new Date(expirationDate),
    userId: userId
};

}
signInWithGoogle() {

  // const headerDict = {
  //   // 'Content-Type': 'application/json',
  //   // 'Accept': 'application/json',
  //   // 'Access-Control-Allow-Headers': 'Content-Type',
  //   'Access-Control-Allow-Origin': '*'
  // };

  // const requestOptions = {
  //   headers: new Headers(headerDict)
  // };

  // return this.http.get('http://127.0.0.1:3000/api/user/google', requestOptions).subscribe( response =>  {




   this.http.get<{username: string}>('http://127.0.0.1:3000/api/user/google').subscribe( response =>  {

    this.router.navigate(['/addReminder']);

     console.log(response);
     if (response)     {
      this.storeUserName(response.username);
     }

}, error => {


});


}
storeUserName(username) {
  sessionStorage.setItem('username' , username) ;

}

  logout() {
this.token = null;
this.isAuthenticated = false;
this.userId = null;
this.authStatusListener.next(false);
clearTimeout(this.tokenTimer );
this.clearAuthData();
this.router.navigate(['/']);
}



}
