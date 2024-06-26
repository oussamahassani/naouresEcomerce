import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import {AuthentificationService} from "../services/auth/authentification.service";
import {RegisterRequest} from "../../models/register-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isShowPass = false;

  handleShowPass () {
    this.isShowPass = !this.isShowPass;
  }

  public registerForm!: FormGroup;
  public formSubmitted = false;

  constructor(private toastrService: ToastrService,
              private authService:AuthentificationService,
              private router:Router) { }

  ngOnInit () {
    this.registerForm = new FormGroup({
      firstName:new FormControl(null,[Validators.required]),
      lastName:new FormControl(null,[Validators.required]),

      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
      genre:new FormControl(null,[Validators.required]),
      tel:new FormControl(null,[Validators.required]),
      birthday:new FormControl(null,[Validators.required]),

    })
  }

  onSubmit() {
    console.log("test")
    this.formSubmitted = true;
    if (this.registerForm.invalid )  {
      console.log("invalid form")
      return ;

    }
      console.log('register-form-value', this.registerForm.value);
      let request:RegisterRequest = new RegisterRequest();

      let request2:RegisterRequest = new RegisterRequest();
      request.firstName = this.firstName?.value;
      request.lastName = this.lastName?.value;
      request.email = this.email?.value;
      request.password = this.password?.value;
      request.genre = this.genre?.value;
      request.tel = this.tel?.value;
      request.birthday = this.birthday?.value;

      /*request2.firstName = "test";
      request2.lastName = "test";
      request2.email ="teste1234@gmail.com";
      request2.password = "test";
      request2.genre = "FEMME";
      request2.tel = "12345678";
      request2.birthday = "24/04/1998";*/
console.log("data",request);
      this.authService.register(request).subscribe(res => {
        this.toastrService.success(`register  successfully`);
        this.router.navigate(['/pages/login'])
      } , error => {
        console.error(error)
      }
       )
    }

  get firstName() { return this.registerForm.get('firstName') }
  get lastName() { return this.registerForm.get('lastName') }
  get birthday() { return this.registerForm.get('birthday') }
  get tel() { return this.registerForm.get('tel') }
  get genre() { return this.registerForm.get('Genre') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }

}
