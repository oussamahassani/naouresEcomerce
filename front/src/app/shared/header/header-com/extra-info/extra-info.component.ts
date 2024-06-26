import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.scss']
})
export class ExtraInfoComponent implements OnInit {
  isConnected = false;


  ngOnInit(): void {
    if (localStorage.getItem("accessToken") != null) {
      this.isConnected = true;
    }
  }
}
