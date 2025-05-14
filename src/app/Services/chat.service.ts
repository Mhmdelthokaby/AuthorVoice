import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  public messages: { senderId: string, message: string }[] = [];

  startConnection(userId: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:5001/chatHub?userId=${userId}`) // pass userId as query
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.error('SignalR error:', err));

    this.hubConnection.on('ReceiveMessage', (senderId: string, message: string) => {
      this.messages.push({ senderId, message });
    });
  }

  sendMessage(senderId: string, receiverId: string, message: string): void {
    this.hubConnection.invoke('SendMessage', senderId, receiverId, message)
      .catch(err => console.error('SendMessage error:', err));
  }
}
