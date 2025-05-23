// src/app/userlist/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userService } from '../user.service';
import { user } from '../user';

@Component({
  standalone: true,
  selector: 'app-user-list',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  imports: [CommonModule]
})
export class UserListComponent implements OnInit {
  users: user[] = [];

  constructor(private userService: userService) {}

  ngOnInit(): void {
    this.userService.getAllusers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Failed to load users', err)
    });
  }
}

