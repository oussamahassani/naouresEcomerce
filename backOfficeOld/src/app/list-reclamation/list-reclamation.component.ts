import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReclamationService } from './reclamationService/reclamation.service';
import moment, { Duration } from 'moment';

@Component({
  selector: 'app-list-reclamation',
  templateUrl:'./list-reclamation.component.html',
  styleUrl: './list-reclamation.component.scss'
})
export class ListReclamationComponent  implements OnInit{
  reclamations: any = [];
  messageEnvoye = false;
  displayedColumns: string[] = ['description', 'dateCreation', 'treated', 'timeElapsed'];
  reclamationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationService
  ) {
    this.reclamationForm = this.fb.group({
      // Ajoutez des contrôles de formulaire si nécessaire
    });
  }

  ngOnInit(): void {
    this.getAllReclamation();
  }

  getAllReclamation() {
    this.reclamationService.getAllReclamations().subscribe((data: any) => {
      this.reclamations = data;
    });
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
}
