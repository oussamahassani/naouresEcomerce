
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsService } from "src/app/services/ads.service";

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.scss'
})
export class CategoryUpdateComponent  implements OnInit {
    updateForm: FormGroup;
    categoryId: string;
  
    constructor(
      private formBuilder: FormBuilder,
      private categoryService: AdsService,
      private route: ActivatedRoute,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      this.categoryId = this.route.snapshot.params['id'];
  
      this.updateForm = this.formBuilder.group({
        name: ['', Validators.required],
      });
  
      // Fetch category data by ID and pre-fill the form
      this.categoryService.getCategoryById(this.categoryId).subscribe((category:any) => {
        this.updateForm.patchValue({
          name: category.name,          // Patch other form controls with category data if needed
        });
      });
    }
  
    onSubmit(): void {
      if (this.updateForm.invalid) {
        return;
      }
  
      const updatedCategory = {
        id: this.categoryId,
        name: this.updateForm.value.name,
      };
  
      // Call category service to update the category
      this.categoryService.updateCategory(updatedCategory).subscribe(() => {
        console.log('Category updated successfully');
        this.router.navigate(['/categories']); // Redirect to category list page
      }, error => {
        console.error('Error updating category:', error);
        // Handle error if necessary
      });
    }
  }
  

