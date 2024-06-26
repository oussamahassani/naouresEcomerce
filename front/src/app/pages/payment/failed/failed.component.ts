
import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.scss']
})

export class FailedComponent {
   errorMessage: string;

  constructor(public dialogRef: MatDialogRef<FailedComponent>) {
    // Fetch error message from API or service
    this.errorMessage = 'Payment failed due to insufficient funds.';
  }


}
