import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdsService } from '../../services/ads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrl: './liste-user.component.scss'
})
export class ListeUserComponent {
  formData: FormData = new FormData();
  Userform:FormGroup = new FormGroup({

  });
  errorMessage = "";
  isSuccessful = false;
  submitted = false ;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  title = '';
  selecteduser = null;
  statutcurrentUser : boolean = true;
  collection : any  = [


  ];
  constructor(
    private userService: AdsService,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  handlePageChange(event: any): void {
 console.log("page chnge user",event)
    this.page = event
  //  this.page = 1;
   // this.collection();
  }
    list() {
      this.router.navigate(["/user"]);
    }


  ngOnInit(): void {
    this.getAllUsers()

  }

  getAllUsers() {
    this.userService.getAllUsersByRole('client').subscribe((res:any) => {
      this.collection = res ;
    })
  }
  currentUserSelected (user : any) {
    this.selecteduser =  user ;
  }
  updateCurrentUser(){
    if(this.selecteduser){
      this.selecteduser.enabled = this.statutcurrentUser;
      this.userService.UpdateStatusUser(this.selecteduser.id , this.statutcurrentUser).subscribe((res:any) =>
      {
        console.log(res.data)
      })
    }


  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.collection();
  }
  searchTitle(): void {
    this.page = 1;

  }




}
