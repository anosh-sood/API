import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Observable } from 'rxjs'; // Import Observable from RxJS for asynchronous operations
import { user } from './user'; // Import the user interface defined in user.ts

@Injectable({
  // 'providedIn: 'root'' makes this service a singleton and available throughout the application.
  // It's equivalent to adding it to the 'providers' array in AppModule.
  providedIn: 'root'
})
export class userService {
  // Define the base URL for your Spring Boot user API.
  // This should match the @RequestMapping("/api/users") in your userController.
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
    // HttpClient is injected into the constructor, making it available for use in this service.
  }

  /**
   * Sends a POST request to create a new user.
   * @param user The user object containing the data to be created.
   * @returns An Observable of the created user object.
   */
  createuser(user: user): Observable<user> {
    // The HTTP POST request sends the 'user' object to the 'apiUrl'.
    // It expects a user object back from the backend.
    return this.http.post<user>(this.apiUrl, user);
  }

  /**
   * Sends a GET request to retrieve all users.
   * @returns An Observable of an array of user objects.
   */
  getAllusers(): Observable<user[]> {
    // The HTTP GET request fetches all users from the 'apiUrl'.
    // It expects an array of user objects back.
    return this.http.get<user[]>(this.apiUrl);
  }

  /**
   * Sends a GET request to retrieve a single user by their email ID.
   * @param emailid The email ID (primary key) of the user to retrieve.
   * @returns An Observable of the retrieved user object.
   */
  getuserByEmailid(emailid: string): Observable<user> {
    // The HTTP GET request targets a specific user using their emailid in the URL path.
    // This matches the @GetMapping("/{emailid}") in your userController.
    return this.http.get<user>(`${this.apiUrl}/${emailid}`);
  }

  /**
   * Sends a DELETE request to remove a user by their email ID.
   * @param emailid The email ID (primary key) of the user to delete.
   * @returns An Observable of type void, as typically no content is returned for a successful delete.
   */
  deleteuser(emailid: string): Observable<void> {
    // The HTTP DELETE request targets a specific user for deletion.
    // This matches the @DeleteMapping("/{emailid}") in your userController.
    return this.http.delete<void>(`${this.apiUrl}/${emailid}`);
  }
}
