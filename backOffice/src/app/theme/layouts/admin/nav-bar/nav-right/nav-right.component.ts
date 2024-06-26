// angular import
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  constructor(
    private route: Router,

  ) { }
  // public method
  profile = [
    {
      icon: 'ti ti-edit-circle',
      title: 'Edit Profile'
    },
    {
      icon: 'ti ti-user',
      title: 'View Profile'
    },
    {
      icon: 'ti ti-clipboard',
      title: 'Social Profile'
    },
    {
      icon: 'ti ti-edit-circle',
      title: 'Billing'
    },
    {
      icon: 'ti ti-power',
      title: 'Logout'
    }
  ];
  logout() {
    // Remove token from local storage or cookies
    localStorage.clear();
    // Optionally, make an API call to the backend to invalidate the token

    // Redirect to the login page or home page
    this.route.navigate(['/login']);
  }

}
