import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './service/upload-file.service';
import { AuthentificationService } from "../services/auth/authentification.service";
import { PaymentService } from "../../shared/services/payment.service"
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  selectedFile: File | undefined;
  uploadProgress: number | undefined;
  imgUrl: string = "";
  listOrder: any = []
  formData: FormData = new FormData();
  listGain: any = [];
  currentUser: any = null;
  listReclamation: any = [];
  listPayement: any = [];
  public changepassForm!: FormGroup;
  public reclamationForm!: FormGroup;
  imagUser = "http://localhost:8081/imageUser/"
  constructor(private uploadFileService: UploadFileService, private authentificationService: AuthentificationService,
    private paymentService: PaymentService,
    private router: Router,
    private toastrService: ToastrService,
  ) {
    this.changepassForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      confirmpassword: new FormControl(null, [Validators.required]),
    })

    this.reclamationForm = new FormGroup({
      description: new FormControl(null, [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.getCurrentUser()
    this.getCurrentOrder()
    this.getlistReclamation()
    this.getListePeyement()
    this.getGainProductByUser()

  }
  getGainProductByUser() {
    let idUser = localStorage.getItem("userId");
    this.paymentService.getGainProduitByUser(idUser).subscribe(res => {
      this.listGain = res;
    })
  }
  getlistReclamation() {
    let idUser = localStorage.getItem("userId");
    this.paymentService.getReclamationByCurrentUser(idUser).subscribe(res => {
      this.listReclamation = res;
    })
  }
  getListePeyement() {
    let idUser = localStorage.getItem("userId");
    this.paymentService.getDetailsPayementByUser(idUser).subscribe(res => {
      this.listPayement = res;
    })
  }
  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  getCurrentOrder() {
    let idUser = localStorage.getItem("userId");
    this.paymentService.getAllPayementOrder(idUser).subscribe(res => {
      this.listOrder = res
    }
    )
  }
  getCurrentUser() {
    let idUser = localStorage.getItem("userId");
    this.authentificationService.getUserCoonected(idUser).subscribe(res => {

      this.currentUser = res;
    })
  }
  formatDate(dateString: any) {
    const date = new Date(dateString);
    return date.toDateString(); // "Wed Jun 25 2024"
  }
  uploadFile(): void {
    if (this.selectedFile) {
      let idUser = localStorage.getItem("userId");


      this.uploadFileService.uploadFile(this.formData, idUser)
        .subscribe(progress => {
          this.uploadProgress = progress;
          if (progress === 100) {
            alert("File upload completed")
            this.selectedFile = undefined;
          }
        });
    }
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    const files: FileList = event.target.files;
    this.formData.append('imgUrl', file);
    if (files.length > 0) {
      this.selectedFile = files[0];
      // You can also set the file name in the form control if needed

      this.uploadFileService.readFile(this.selectedFile).subscribe(res => {
        console.log("res", res)
        this.currentUser.img = res
        this.currentUser.imgUrl = null
      })
    }
  }

  get confirmpassword() { return this.changepassForm.get('confirmpassword') }
  get password() { return this.changepassForm.get('password') }
  get description() { return this.changepassForm.get('description') }
  updatePassword() {
    let idUser = localStorage.getItem("userId");

    if (this.changepassForm.value.password == this.changepassForm.value.confirmpassword) {
      this.authentificationService.updatePassword(idUser, this.changepassForm.value.password).subscribe(res => {
        this.toastrService.success(`password  updated`);

      })
    }
  }
  addReclamation() {
    let idUser = localStorage.getItem("userId");
    let description = this.reclamationForm.value.description
    let obj = {
      treated: false,
      idUser,
      description
    }
    this.paymentService.postNewReclamation(obj).subscribe(res => {
      this.toastrService.success(`reclamation  ajouter avec success`);
      this.getlistReclamation()
    }

    )

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/pages/home']);
  }
}
