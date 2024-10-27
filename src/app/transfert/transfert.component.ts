import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-transfert',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './transfert.component.html',
  styleUrl: './transfert.component.css'
})
export class TransfertComponent {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faUser = faUser;
}
