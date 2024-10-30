import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { IContact } from '../interfaces/index.ts';
@Component({
  selector: 'app-transfert',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './transfert.component.html',
  styleUrl: './transfert.component.css',
})
export class TransfertComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faUser = faUser;

  contact = signal<IContact | undefined>(undefined);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.contact.set(history.state['contact']);
    console.log(this.contact());
  }
}
