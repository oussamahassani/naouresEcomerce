import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdsService } from "src/app/services/ads.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent implements OnInit {
  formData: FormData = new FormData();

  Categoryform: FormGroup = new FormGroup({

  });
  errorMessage = "";
  isSuccessful = false;
  submitted = false ;
  private selectedFile: File;
  constructor(
    private adsService: AdsService,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.Categoryform = this.formBuilder.group({
      name: ['',  Validators.required],

      imgUrl: ['', Validators.required],

    });
    }



  handleFileInput(event: any) {
    const file = event.target.files[0];
    const files: FileList = event.target.files;
    this.formData.append('photoCategory', file);
    if (files.length > 0) {
      this.selectedFile = files[0];
      // You can also set the file name in the form control if needed
      this.Categoryform.get('imgUrl').setValue(this.selectedFile.name);
    }
  }
  list() {
    this.router.navigate(["/categories"]);
  }


  onSubmit() {
    console.log('the data is',this.Categoryform.value);
    const name = this.Categoryform.value.name;
    const imageFile = this.selectedFile;
    this.adsService.postNewCategory(name, imageFile).subscribe(
      (data) => {
        console.log(data);
        console.log(this.Categoryform);

        this.isSuccessful = true;

      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
    this.submitted = true;
  }

}
