import { Component } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  formSubmitted = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastrService: ToastrService,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];
  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      // Handle valid form submission
      console.log('Form Submitted', this.loginForm.value);
      // reset formSubmitted and error after a successful submission
      this.formSubmitted = false;
      this.error = null;
      this.authService.login(this.loginForm.value)
        .subscribe(response => {
          // Handle success
          this.error = null; // Clear any previous errors
          if ((response.role == "ROLE_SUPERADMIN" || response.role == "ROLE_ADMIN") && response.enabled) {
            console.log('Super Admin login successfully!');
            this.toastrService.success(`compte desactiver`);
            if (response.token) {
              localStorage.setItem("token", response.token)
              localStorage.setItem("role", response.role)
              localStorage.setItem("userId", response.userId)
              this.router.navigate(['/list-reclamation']);
            }
          }
          else if ((response.role != "ROLE_SUPERADMIN" && response.role != "ROLE_ADMIN") && response.enabled) {
            this.toastrService.error(`vous n'avez pas autorisation   a accedez a cette interface`);
          }
          else {
            this.toastrService.error(`compte desactiver`);

          }
          // Redirect to login page or show success message
        }, error => {
          // Handle error
          this.error = '"Credentials are invalid or the user is disabled. Please contact your administrator or verify your credentials';
        })
    } else {
      // Handle invalid form submission
      this.error = 'Please fix the errors in the form.';
    }
  }



  isValid() {
    // Implement your form validation logic here
    return true; // Replace with your actual validation logic
  }
}
