import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UtilsService } from '../../services/utils.service';
import { AuthentificationService } from "../../../pages/services/auth/authentification.service"
@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  @Input() header_big = false;
  @Input() white_bg = false;
  @Input() transparent = false;
  isConnected = false;
  currentUser: any = null;
  public sticky: boolean = false;

  constructor(
    public cartService: CartService,
    public utilsService: UtilsService,
    private authentificationService: AuthentificationService
  ) { }



  ngOnInit(): void {
    if (localStorage.getItem("accessToken") != null) {
      this.isConnected = true;
      this.getCurrentUser()
    }
  }
  getCurrentUser() {
    let idUser = localStorage.getItem("userId");
    this.authentificationService.getUserCoonected(idUser).subscribe(res => {

      this.currentUser = res;
    })
  }
  // sticky nav
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
