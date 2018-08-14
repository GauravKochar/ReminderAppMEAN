import { Component, OnInit } from '@angular/core';
import {Message} from './message.model';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
messages: Message[] = [];
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    const message = new Message('Welcome  to My Chatbot', 'assets/images/bot.png', new Date());
    this.messages.push(message);
  }
  sendMessage(messageContent) {
    const  message = new Message( messageContent.value, 'assets/images/user.png', new Date());
    this.messages.push(message);
    console.log(messageContent.value);
    this.chatService.sendMessage(messageContent.value).subscribe(res => {
console.log(res);
const message1 = new Message(res.result.speech, 'assets/images/bot.png', new Date());
this.messages.push(message1);

    }, err => {
      console.log(err);
    });


  }

}
