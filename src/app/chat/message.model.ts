export class Message {
content: string;
image: string;
timeStamp: Date;
constructor (content: string , image: string , timeStamp: Date) {
  this.content = content;
  this.image = image;
  this.timeStamp = timeStamp;
}
}
