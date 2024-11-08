import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { ClientService } from '../services/client.service';
import { IContact } from '../interfaces/index.ts';
import { Observable, of } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchContactPipe } from '../pipes/search-contact.pipe';
import { SignalBaseService } from '../services/signal-base.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    SearchContactPipe,
  ],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css',
})
export class CreditComponent implements OnInit, OnDestroy {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faUser = faUser;
  query: string = '';

  contacts$!: Observable<IContact[]>;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private signalBaseService: SignalBaseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.clientService.getContacts().subscribe({
      next: (response) => {
        this.contacts$ = of(response.data.contacts);
      },
      error: (error) => {},
    });
  }

  handleChooseContact(idContact: number) {
    this.contacts$.subscribe((contacts) => {
      const contact = contacts.find((c) => c.id === idContact);

      if (contact) {
        this.router.navigate(['/web/credit-montant'], { state: { contact } });
      }
    });
  }

  goBack(event: Event): void {
    event.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {}
}
