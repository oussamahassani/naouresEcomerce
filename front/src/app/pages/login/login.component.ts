import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from "../../models/register-request";
import { AuthentificationService } from "../services/auth/authentification.service";

import { Router } from "@angular/router";
import { AuthRequest } from "../../models/auth-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isShowPass = false;

  handleShowPass() {
    this.isShowPass = !this.isShowPass;
  }

  public loginForm!: FormGroup;
  public formSubmitted = false;

  constructor(private toastrService: ToastrService,
    private authService: AuthentificationService,
    private router: Router) { }

  ngOnInit() {
    localStorage.clear()
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      console.log('login-form-value', this.loginForm.value);
      console.log("texte 2")
      let request: AuthRequest = new AuthRequest();
      request.email = this.email?.value;
      request.password = this.password?.value;
      // Reset the form
      this.authService.login(request).subscribe(res => {
        console.log('res ', res)
        localStorage.setItem("accessToken", res.token as string);
        localStorage.setItem("role", res.role as string);
        localStorage.setItem("userId", res.userId as string);
        localStorage.setItem("nameUser", res.nameUser as string);


        this.toastrService.success(`login  successfully`);
        this.router.navigate(['/pages/home']);
      }, error => {
        console.error("err", error)
        this.toastrService.error(error.error.message);

      }, () => {
        this.loginForm.reset();
        this.formSubmitted = false; // Reset formSubmitted to false
      })
    }
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
