import { Component } from '@angular/core';
import { UserFormComponent } from './userform/userform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './userlist/userlist.component';
import { RouterModule } from '@angular/router';



@Component({
  standalone:true,
  selector: 'app-root',
  imports : [ RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-form-app';
}
