import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdsService } from "src/app/services/ads.service";
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent  implements OnInit {
  formData: FormData = new FormData();

  Produitform: FormGroup = new FormGroup({

  });
  errorMessage = "";
  isSuccessful = false;
  submitted = false ;
  listCategory = [];
  private selectedFile: File;
  constructor(
    private formBuilder: FormBuilder,
    private produitService: AdsService,
    private router: Router
  ) { }
  ngOnInit(): void {

    this.Produitform = this.formBuilder.group({
      name: ['', Validators.required],
      category:['', Validators.required],
      imgUrl:['', Validators.required],
      price:['', Validators.required],
      description:['', Validators.required],
    });


    this.produitService.getAllCategory().subscribe( (res:any) =>
    {
      this.listCategory = res})}

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const files: FileList = event.target.files;
    this.formData.append('photoProduct', file);
    if (files.length > 0) {
      this.selectedFile = files[0];
      this.Produitform.get('imgUrl').setValue(this.selectedFile.name);
    }
  }

list() {
  this.router.navigate(["/products"]);
}


onSubmit() {
console.log('the data is ', this.Produitform.value);

  this.formData.append('name', this.Produitform.value.name);
  this.formData.append('category',this.Produitform.value.category);
  this.formData.append('price',this.Produitform.value.price);

  this.formData.append('description', this.Produitform.value.description);


  this.produitService.createNewProduit(this.formData ).subscribe(
    (data) => {

      console.log(data);
      console.log(this.Produitform);

      this.isSuccessful = true;

    },
    (err) => {
      this.errorMessage = err.error.message;
    }
  );
  this.submitted = true;
}
}
