
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from "../services/auth/authentification.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  message!: string;
  constructor(private authService: AuthentificationService, private toastrService: ToastrService,) { }
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required])

    });
  }

  onSubmit() {
    this.authService.contactUs(this.contactForm.value).subscribe((response: any) => {
      next: (data: any) => {
        this.message = data;

        //   this.router.navigate(['/home'])
      }
    },

      (error) => {
        this.toastrService.success(`cannot send your email, adrese not valid `);

      })
  }
}