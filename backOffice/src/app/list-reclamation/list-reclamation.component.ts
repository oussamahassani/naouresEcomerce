import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReclamationService } from './reclamationService/reclamation.service';
import moment, { Duration } from 'moment';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrl: './list-reclamation.component.scss'
})
export class ListReclamationComponent implements OnInit {
  reclamations: any = [{
    id: '667af290d1f7166c277a6ba7',
    createdDate: '2024-06-25T16:38:40.768+00:00',
    idUser: '667970750f172921151b9064',
    treated: false,
    description: 'new reclamation'
  },];
  messageEnvoye = false;
  displayedColumns: string[] = ['description', 'createdDate', 'treated', 'timeElapsed'];
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
  update(obj: any) {
    obj.treated = true;
    this.reclamationService.updateReclamations(obj).subscribe(res => {
      console.log("reclamtion traiter")
      this.getAllReclamation()
    })
  }
  remove(obj: any) {
    obj.treated = true;
    this.reclamationService.removeReclamations(obj).subscribe(res => {
      console.log("reclamtion traiter")
      this.getAllReclamation()
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
}
