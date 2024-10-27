import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-credit',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css',
})
export class CreditComponent {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faUser = faUser;
}
