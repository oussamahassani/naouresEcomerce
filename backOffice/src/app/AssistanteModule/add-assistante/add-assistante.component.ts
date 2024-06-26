import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsService } from '../../services/ads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assistante',

  templateUrl: './add-assistante.component.html',
  styleUrl: './add-assistante.component.scss'
})
export class AddAssistanteComponent implements OnInit {
  formData: FormData = new FormData();

  AssistanteForm: FormGroup = new FormGroup({});

  errorMessage = "";
  isSuccessful = false;
  submitted = false;
  listCategory = [];
  private selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.AssistanteForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      genre: ['', Validators.required],
      tel: ['', Validators.required],
      brithday: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      imgUrl: ['', Validators.required],
      enabled: ['', Validators.required],

    });


  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const files: FileList = event.target.files;
    this.formData.append('imgUrl', file);
    if (files.length > 0) {
      this.selectedFile = files[0];
      this.AssistanteForm.get('imgUrl').setValue(this.selectedFile.name);
    }
  }


  list() {
    this.router.navigate(["/assistante"]);
  }


  onSubmit() {
    console.log('the data is ', this.AssistanteForm.value);

    this.formData.append('firstName', this.AssistanteForm.value.firstName);
    this.formData.append('lastName', this.AssistanteForm.value.lastName);
    this.formData.append('genre', this.AssistanteForm.value.genre);
    this.formData.append('tel', this.AssistanteForm.value.tel);
    this.formData.append('brithday', this.AssistanteForm.value.brithday);
    this.formData.append('email', this.AssistanteForm.value.email);
    this.formData.append('password', this.AssistanteForm.value.password);
    this.formData.append('enabled', this.AssistanteForm.value.enabled);
    this.formData.append('role', 'Admin');


    this.adminService.createNewAdmin(this.formData).subscribe(
      (data) => {

        console.log(data);
        console.log(this.AssistanteForm);

        this.isSuccessful = true;

      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
    this.submitted = true;
  }
}


