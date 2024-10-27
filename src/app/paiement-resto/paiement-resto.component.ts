import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-paiement-resto',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './paiement-resto.component.html',
  styleUrl: './paiement-resto.component.css'
})
export class PaiementRestoComponent {
  faArrowLeft = faArrowLeft;

}
