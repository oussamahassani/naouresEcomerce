import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsService } from '../../services/ads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',

  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss'
})
export class AddArticleComponent implements OnInit {
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

      postContent: ['', Validators.required],
      title: ['', Validators.required],
      imgUrl: ['', Validators.required],

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
    this.router.navigate(["/article"]);
  }


  onSubmit() {
    console.log('the data is ', this.AssistanteForm.value);

    this.formData.append('postContent', this.AssistanteForm.value.postContent);
    this.formData.append('title', this.AssistanteForm.value.title);



    this.adminService.createNewArticle(this.formData).subscribe(
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


