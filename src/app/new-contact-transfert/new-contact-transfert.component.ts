import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-contact-transfert',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './new-contact-transfert.component.html',
  styleUrl: './new-contact-transfert.component.css',
})
export class NewContactTransfertComponent {
  faArrowLeft = faArrowLeft;
}
