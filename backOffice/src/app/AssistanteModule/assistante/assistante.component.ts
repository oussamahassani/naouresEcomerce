import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsService } from '../../services/ads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistante',
  templateUrl: './assistante.component.html',
  styleUrl: './assistante.component.scss'
})
export class AssistanteComponent {

  formData: FormData = new FormData();
  urlImageUser = "http://localhost:8081/imageUser/"
  AdminForm: FormGroup = new FormGroup({

  });
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  title = '';
  selecteduser = null;
  statutcurrentUser: boolean = true;
  collection: any = [


  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: AdsService,
    private router: Router,
    private elementRef: ElementRef
  ) { }
  ngOnInit(): void {

    this.AdminForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      genre: ['', Validators.required],
    });


    this.userService.getAllUsersByRole('admin').subscribe((res: any) => {
      this.collection = res
    })
  }



  list() {
    this.router.navigate(["/products"]);
  }

  handlePageSizeChange(event: any): void {
    console.log("page size", event)
    this.pageSize = event.target.value;
    this.page = 1;
    this.collection();
  }

  searchTitle(): void {
    this.page = 1;

  }
  handlePageChange(event: any): void {
    console.log("page chnge", event)
    //this.pageSize = event.target.value
    this.page = event;
    this.collection();
  }
  currentUserSelected(user: any) {
    this.selecteduser = user;
  }
  updateCurrentUser() {
    const modalElement = this.elementRef.nativeElement.querySelector('#myModalButton');
    modalElement.click()
    // Close the modal using Bootstrap's modal API

    if (this.selecteduser) {
      this.selecteduser.enabled = this.statutcurrentUser;
      this.userService.UpdateStatusUser(this.selecteduser.id, this.statutcurrentUser).subscribe((res: any) => {
        this.userService.getAllUsersByRole('admin').subscribe((res: any) => {
          this.collection = res
        })
      })
    }


  }

}
