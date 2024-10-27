import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faLightbulb, faBurger } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './paiement.component.html',
  styleUrl: './paiement.component.css'
})
export class PaiementComponent {
  faArrowLeft = faArrowLeft;
  faLightbulb = faLightbulb;
  faBurger = faBurger;
}
