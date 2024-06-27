import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdsService } from "src/app/services/ads.service";
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-pack-add',
  templateUrl: './pack-add.component.html',
  styleUrl: './pack-add.component.scss'
})
export class PackAddComponent  implements OnInit {
  formData: FormData = new FormData();

  PackForm: FormGroup = new FormGroup({

    });
    errorMessage = "";
    isSuccessful = false;
    submitted = false ;
    constructor(
      private formBuilder: FormBuilder,
      private packService: AdsService,
      private router: Router
    ) { }
    ngOnInit(): void {

      this.PackForm = this.formBuilder.group({
        name: ['', Validators.required],
        imgUrl:['', Validators.required],
        price:['', Validators.required],
        description:['', Validators.required],
      });



      }
      handleFileInput(event: any) {
        const file = event.target.files[0];
        this.formData.append('photoPack', file);
        this.formData.append('photoPack', file);
      }

  list() {
    this.router.navigate(["/pack"]);
  }


  onSubmit() {
    this.formData.append('namePack', this.PackForm.value.name);
    this.formData.append('price',this.PackForm.value.price);
    this.formData.append('description',this.PackForm.value.description);
    this.packService.createNewPack( this.formData).subscribe(
      (data) => {

        this.isSuccessful = true;

      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
    this.submitted = true;
  }
  }

