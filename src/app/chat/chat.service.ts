import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = 'https://api.dialogflow.com/v1/query';
  accessToken = '03f034dfed134e31b36cc38227d94cc8';


  constructor(private http: Http, private authService: AuthService) {

   }

   public sendMessage(message: string) {
     const token = this.authService.getToken();
     if (!token)     {
       alert(' You are not logged in ');
       return;
     }
     const  data = {
       lang: 'en',
       sessionId: token,
       query: message
     };
     const  headers = new Headers();
     headers.append('Authorization', 'Bearer ' + this.accessToken);
     console.log('agyaaaaaaaa');

     return this.http.post(this.url, data , { headers: headers }).pipe(map(res => {
      return res.json();

     })
    );


   }
}
