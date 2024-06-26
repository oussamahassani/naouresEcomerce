import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsService } from "src/app/services/ads.service";
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit{
  updateForm: FormGroup;
  produitId: string;
  isSuccessful : boolean = false ;
  errorMessage = '';
  submitted = false;
  listCategory = [];
  constructor(
    private formBuilder: FormBuilder,
    private produitService: AdsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.produitId = this.route.snapshot.params['id'];

    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      category:['', Validators.required],
      imgUrl:['', Validators.required],
      price:['', Validators.required],
      description:['', Validators.required],
    });
    this.produitService.getAllCategory().subscribe( (res:any) =>
    {
      this.listCategory = res})
    // Fetch category data by ID and pre-fill the form
    this.produitService.getOneProduit(this.produitId).subscribe((produit:any) => {
      this.updateForm.patchValue({
        name: produit.name,   
        category: produit.category.id,
      imgUrl:produit.imgUrl,
      price:produit.price,
      description:produit.description
      });
    });
  }

  onSubmit(): void {
    if (this.updateForm.invalid) {
      return;
    }

    const updatedProduit = {
      id: this.produitId,
      name: this.updateForm.value.name,
      category: this.updateForm.value.category,
      imgUrl: this.updateForm.value.imgUrl,
      price: this.updateForm.value.price,
      description: this.updateForm.value.description,
    };

    // Call category service to update the category
    this.produitService.updateProduit(updatedProduit).subscribe(() => {
      console.log('Produit updated successfully');
      this.isSuccessful = true ;
      this.router.navigate(['/products']); // Redirect to produit list page
    }, error => {
      console.error('Error updating Produit:', error);
      // Handle error if necessary
    });
  }
}
