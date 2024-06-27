import { Component } from '@angular/core';
import { AdsService } from "src/app/services/ads.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-whelle-add-new',
  templateUrl: './whelle-add-new.component.html',
  styleUrl: './whelle-add-new.component.scss'
})
export class WhelleAddNewComponent {

  formData = {
    fillStyle: '',
    text: '',
    textFillStyle: '',
    textFontSize: ''
  };
  isSpinning: boolean = false; // Flag to control animation

  constructor(
    private productService: AdsService,
    private router: Router
  ) { }

  onSubmit(): void {
    // Utilize Axios for form data submission

    // Start spinner animation
    this.isSpinning = true;

    let myformData = new FormData();
    myformData.append("fillStyle", this.formData.fillStyle);
    myformData.append("text", this.formData.text);
    myformData.append("textFillStyle", this.formData.textFillStyle);
    myformData.append("textFontSize", this.formData.textFontSize);

    this.productService.createroulette(myformData)
      .subscribe(response => {
        // Stop spinner animation
        this.isSpinning = false;

        // Handle server response if needed
        this.router.navigate(["/whellMangement"]);
        console.log(response);
      });
  }
}
