import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message = '';
  senderId = '';
  receiverId = '';
  role = '';

  // For admin to select users
  userList: { id: string, name: string, role: string }[] = [];

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.senderId = localStorage.getItem('userId') || '';
    this.role = localStorage.getItem('role') || '';

    if (this.role === 'admin') {
      // TODO: Load users to chat with (e.g. from backend)
      this.loadUsers();
    } else {
      this.receiverId = 'admin'; // Fixed
    }

    this.chatService.startConnection(this.senderId);
  }

  send(): void {
    if (this.message.trim() && this.receiverId) {
      this.chatService.sendMessage(this.senderId, this.receiverId, this.message);
      this.message = '';
    }
  }

  // Simulate fetch from backend
  loadUsers(): void {
    // This should be fetched from an API like: /api/users?excludeRole=admin
    this.userList = [
      { id: 'author123', name: 'Author John', role: 'author' },
      { id: 'pub456', name: 'Publisher XYZ', role: 'publishinghouse' }
    ];
  }
}
