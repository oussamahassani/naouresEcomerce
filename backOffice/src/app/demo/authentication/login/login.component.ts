// angular import
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {

  //email: string;
  password: string;
  error: string;

  public loginForm!: FormGroup;

  public formSubmitted = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // other form controls
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  onSubmit() {
    // Validate form input (similar to your login form)
    if (this.isValid()) {
      const createUrl = 'http://your-backend-url/api/superadmin/create'; // Replace with your actual URL
      this.http.post(createUrl, { email: this.email, password: this.password })
        .subscribe(response => {
          // Handle success
          this.error = null; // Clear any previous errors
          console.log('Super Admin created successfully!');
          // Redirect to login page or show success message
        }, error => {
          // Handle error
          this.error = error.message || 'An error occurred while creating Super Admin.';
        });
    }
  }

  isValid() {
    // Implement your form validation logic here
    return true; // Replace with your actual validation logic
  }
}
