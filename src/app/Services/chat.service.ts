import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private connectionEstablished = new BehaviorSubject<boolean>(false);
  
  // Expose as observable for components to check connection state
  public connectionEstablished$ = this.connectionEstablished.asObservable();

  public startConnection(userId: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://theauthors.runasp.net/chatHub?userId=${userId}`)
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000]) // Reconnect times in ms
      .build();

    // Setup connection handlers
    this.setupConnectionHandlers();

    // Start the connection
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connectionEstablished.next(true);
      })
      .catch(err => {
        console.error('Error while starting connection: ', err);
        // Attempt reconnection after 5 seconds
        setTimeout(() => this.startConnection(userId), 5000);
      });
  }

  private setupConnectionHandlers() {
    this.hubConnection.onreconnecting(error => {
      console.log('Reconnecting...', error);
      this.connectionEstablished.next(false);
    });

    this.hubConnection.onreconnected(connectionId => {
      console.log('Reconnected with ID: ', connectionId);
      this.connectionEstablished.next(true);
    });

    this.hubConnection.onclose(error => {
      console.log('Connection closed', error);
      this.connectionEstablished.next(false);
    });
  }

  public async sendMessage(senderId: string, receiverId: string, message: string): Promise<boolean> {
    try {
      
      // Check if connection exists and is active before sending
      if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
        await this.hubConnection.invoke('SendMessage', senderId, receiverId, message);
        return true;
      } else {
        console.error('Cannot send message: connection not established');
        return false;
      }
    } catch (err) {
      console.error('Error sending message: ', err);
      return false;
    }
  }

  public onReceiveMessage(callback: (senderId: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  public disconnect() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}