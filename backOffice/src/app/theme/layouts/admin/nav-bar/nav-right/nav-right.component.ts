// angular import
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { UserService } from '../../../../../services/user.service'
import moment, { Duration } from 'moment';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  curentUser: any
  notifList: any;
  notifNotRead: any;
  userPhoto = "http://localhost:8081/imageUser/"
  constructor(
    private route: Router,
    private userService: UserService
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
  ngOnInit(): void {
    this.returnCurrentUser()

  }
  logout() {
    // Remove token from local storage or cookies
    localStorage.clear();
    // Optionally, make an API call to the backend to invalidate the token

    // Redirect to the login page or home page
    this.route.navigate(['/login']);
  }

  returnCurrentUser() {
    let idUser = localStorage.getItem("userId")
    this.userService.getUserById(idUser).subscribe((res: any) => {
      this.curentUser = res;
      if (res.id) {
        this.userService.getNotif(res.id).subscribe(res => {
          this.notifList = res;
          this.notifNotRead = this.notifList.filter(el => el.isRead = false);
        })
      }
    })
  }

  getTimeElapsed(dateCreation: string): string {
    const now = moment();
    const creationDate = moment(dateCreation);
    const duration: Duration = moment.duration(now.diff(creationDate));
    const days = duration.asDays();

    if (days < 1) {
      return `${Math.floor(duration.asHours())} heures`;
    } else {
      return `${Math.floor(days)} jours`;
    }
  }
  readnotification() {
    let idUser = localStorage.getItem("userId")
    this.userService.readAllNotif(idUser).subscribe(res => {
      console.log(res)
    })
  }
}
