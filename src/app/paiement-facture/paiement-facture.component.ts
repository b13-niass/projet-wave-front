import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-paiement-facture',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './paiement-facture.component.html',
  styleUrl: './paiement-facture.component.css',
})
export class PaiementFactureComponent {
  faArrowLeft = faArrowLeft;
}
