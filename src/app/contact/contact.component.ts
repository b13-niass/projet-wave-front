import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { ClientService } from '../services/client.service';
import { IContact } from '../interfaces/index.ts';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchContactPipe } from '../pipes/search-contact.pipe';

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
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit, OnDestroy {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faUser = faUser;
  query: string = '';

  contacts$!: Observable<IContact[]>;

  constructor(private router: Router, private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getContacts().subscribe({
      next: (response) => {
        this.contacts$ = of(response.data.contacts);
      },
      error: (error) => {},
    });
  }

  handleChooseContact(idContact: number){

  }

  ngOnDestroy(): void {}
}
