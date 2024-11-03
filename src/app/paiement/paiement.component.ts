import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faLightbulb,
  faBurger,
} from '@fortawesome/free-solid-svg-icons';
import { ClientService } from '../services/client.service';
import { SignalBaseService } from '../services/signal-base.service';
import { CommonModule, Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { IFournisseur } from '../interfaces/index.ts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchContactPipe } from '../pipes/search-contact.pipe';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SearchContactPipe,
    FormsModule,
  ],
  templateUrl: './paiement.component.html',
  styleUrl: './paiement.component.css',
})
export class PaiementComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faLightbulb = faLightbulb;
  faBurger = faBurger;

  query: string = '';

  fournisseurs$!: Observable<IFournisseur[]>;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private signalBaseService: SignalBaseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.clientService.getFournisseurs().subscribe({
      next: (response) => {
        this.fournisseurs$ = of(response.data.fournisseurs);
      },
      error: (error) => {},
    });
  }

  handleChooseFournisseur(fournisseur: IFournisseur) {
    if (fournisseur.type_fournisseur == 'facture') {
      this.router.navigate(['/web/paiement-facture'], {
        state: { fournisseur },
      });
    }
    if (fournisseur.type_fournisseur == 'restaurant') {
      this.router.navigate(['/web/paiement-resto'], { state: { fournisseur } });
    }
  }
  goBack(event: Event): void {
    event.preventDefault();
    this.location.back();
  }
}
