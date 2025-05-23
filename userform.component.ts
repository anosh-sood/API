// src/app/user-form/user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userService } from '../user.service'; // IMPORTANT: This service is required for API calls
import { user } from '../user'; // IMPORTANT: This interface defines the User data structure
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone:true,
  selector: 'app-user-form',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css'],
  imports: [ReactiveFormsModule, CommonModule,RouterModule]
})
export class UserFormComponent implements OnInit {
  // FormGroup to manage the form controls and their validation state
  userForm: FormGroup;
  // Array to hold the list of users retrieved from the backend for display
  users: user[] = [];
  // String to display messages to the user (e.g., success, error, validation hints)
  submissionMessage: string = '';

  constructor(
    private fb: FormBuilder, // Injects FormBuilder to help create reactive forms
    private userService: userService // Injects UserService to handle communication with the Spring Boot backend
  ) {
    // Initialize the userForm with its controls and their respective validators.
    // The names here ('name', 'emailid', 'password') MUST match the field names
    // in your Angular User interface and your Spring Boot User model for correct data binding.
    this.userForm = this.fb.group({
      // 'name' field: required
      name: ['', Validators.required],

      // 'emailid' field: required and must be a valid email format.
      // This 'emailid' field corresponds to the primary key in your Spring Boot User entity.
      emailid: ['', [Validators.required, Validators.email]],

      // 'password' field: required, minimum length, and a complex pattern.
      // The pattern ensures it contains at least one uppercase, one lowercase, one digit, and one special character.
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]]
    });
  }

  // ngOnInit is a lifecycle hook called after the component's data-bound properties are initialized.
  ngOnInit(): void {
    this.loadUsers(); // Load the list of existing users when the component first loads.
  }

  // Method to handle the form submission event.
  onSubmit(): void {
    // Check if the form is valid based on all defined validators.
    if (this.userForm.valid) {
      // Extract the form's current values and cast them to the User interface type.
      // The keys in userForm.value (name, emailid, password) will match the User interface.
      const newUser: user = this.userForm.value;

      // Call the createUser method from the UserService to send the new user data to the backend API.
      this.userService.createuser(newUser).subscribe({
        // 'next' callback handles a successful response from the API.
        next: (res) => {
          console.log('User created successfully:', res);
          this.submissionMessage = 'User created successfully!';
          this.userForm.reset(); // Reset the form fields to their initial empty state.
          this.loadUsers(); // Reload the list of users to display the newly added user.
        },
        // 'error' callback handles an error response from the API.
        error: (err) => {
          console.error('Error creating user:', err);
          // Attempt to extract and display a more user-friendly error message
          // from the backend's response, especially for validation errors.
          if (err.error && err.error.errors) {
              // Spring Boot validation errors (e.g., from @Valid) often come in this format.
              this.submissionMessage = 'Error: ' + err.error.errors.map((e: any) => e.defaultMessage).join(', ');
          } else if (err.error && err.error.message) {
              // General error message from the backend.
              this.submissionMessage = 'Error: ' + err.error.message;
          } else {
              // Generic fallback message if the error structure is unexpected.
              this.submissionMessage = 'Error creating user: An unknown error occurred.';
          }
        }
      });
    } else {
      // If the form is invalid, set a general message and mark all form controls as 'touched'.
      // Marking as touched will trigger the display of validation error messages in the HTML.
      this.submissionMessage = 'Please fill out the form correctly.';
      this.userForm.markAllAsTouched();
    }
  }

  // Method to fetch all users from the backend API.
  loadUsers(): void {
    // Call the getAllUsers method from the UserService.
    this.userService.getAllusers().subscribe({
      // 'next' callback handles a successful response, providing the list of users.
      next: (users) => {
        this.users = users; // Assign the fetched users to the component's 'users' array.
        console.log('Loaded users:', users);
      },
      // 'error' callback handles any errors during the fetching process.
      error: (err) => {
        console.error('Error loading users:', err);
        this.submissionMessage = 'Error loading users: ' + (err.error?.message || 'Failed to fetch users.');
      }
    });
  }
}