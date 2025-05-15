import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChatService } from '../../Services/chat.service';
import { firstValueFrom, Subscription, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-adminchat',
  templateUrl: './adminchat.component.html',
  styleUrls: ['./adminchat.component.css']
})
export class AdminchatComponent implements OnInit, OnDestroy, AfterViewChecked {
  adminId: number = 27;
  selectedUserId: number = 0;

  messageText: string = '';
  messages: any[] = [];
  users: any[] = [];

  isLoading: boolean = false;
  isMessageSending: boolean = false;
  errorMessage: string = '';
  connectionEstablished: boolean = false;
  newMessageAdded: boolean = false;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  private connectionSubscription!: Subscription;

  constructor(private chatService: ChatService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
    this.initializeChat();
  }

  ngOnDestroy(): void {
    this.connectionSubscription?.unsubscribe();
    this.chatService.disconnect();
  }

  ngAfterViewChecked(): void {
    if (this.newMessageAdded && this.messagesContainer) {
      this.scrollToBottom();
      this.newMessageAdded = false;
    }
  }

  private initializeChat(): void {
    this.chatService.startConnection(this.adminId.toString());

    this.connectionSubscription = this.chatService.connectionEstablished$.subscribe(
      (established) => {
        this.connectionEstablished = established;
        if (established && this.selectedUserId) {
          this.loadHistory();
        }
      }
    );

    this.chatService.onReceiveMessage((senderId, message) => {
      const senderIdNum = Number(senderId);
      if (senderIdNum === this.selectedUserId && senderIdNum !== this.adminId) {
        this.messages.push({
          senderId: senderIdNum,
          content: message,
          timestamp: new Date(),
        });
        this.newMessageAdded = true;
      }
    });
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .get<any[]>('https://theauthors.runasp.net/api/user/forchats')
      .pipe(
        catchError((error) => this.handleError(error)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((allUsers) => {
        this.users = allUsers.filter((u) => u.id !== this.adminId);

        if (this.users.length > 0 && !this.selectedUserId) {
          this.selectedUserId = this.users[0].id;
          this.loadHistory();
        }
      });
  }

  onUserSelect(): void {
    this.messages = [];
    this.loadHistory();
  }

  loadHistory(): void {
    if (!this.selectedUserId) return;

    this.isLoading = true;
    this.errorMessage = '';

    const url = `https://theauthors.runasp.net/api/chat/history?userId1=${this.adminId}&userId2=${this.selectedUserId}`;
    this.http
      .get<any[]>(url)
      .pipe(
        catchError((error) => this.handleError(error)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((data) => {
        this.messages = data;
      });
  }

  async sendMessage(): Promise<void> {
    const trimmedMessage = this.messageText.trim();
    if (!trimmedMessage || !this.selectedUserId) return;

    if (!this.connectionEstablished) {
      this.errorMessage = 'Cannot send message: Not connected to chat server';
      return;
    }

    this.isMessageSending = true;
    this.errorMessage = '';

    const payload = {
      SenderId: this.adminId,
      ReceiverId: this.selectedUserId,
      Content: trimmedMessage,
    };

    try {
      console.log(payload);
      
      await firstValueFrom(this.http.post('https://theauthors.runasp.net/api/chat/send', payload));

      const sent = await this.chatService.sendMessage(
        this.adminId.toString(),
        this.selectedUserId.toString(),
        trimmedMessage
      );

      if (sent) {
        this.messages.push({
          senderId: this.adminId,
          content: trimmedMessage,
          timestamp: new Date(),
        });
        this.newMessageAdded = true;
        this.messageText = '';
      } else {
        this.errorMessage = 'Failed to send message via real-time connection';
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isMessageSending = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom', err);
    }
  }

  private handleError(error: any) {
    let errorMessage = '';

    if (error instanceof HttpErrorResponse) {
      errorMessage =
        error.status === 0
          ? 'Cannot connect to server. Please check your connection.'
          : `Error ${error.status}: ${error.error?.message || error.statusText}`;
    } else {
      errorMessage = error.message || 'Unknown error occurred';
    }

    this.errorMessage = errorMessage;
    console.error('Chat error:', error);
    return throwError(() => errorMessage);
  }
}
