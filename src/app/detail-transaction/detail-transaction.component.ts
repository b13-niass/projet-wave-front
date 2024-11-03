import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail-transaction',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './detail-transaction.component.html',
  styleUrl: './detail-transaction.component.css',
})
export class DetailTransactionComponent {
  faArrowLeft = faArrowLeft;

  constructor(private location: Location) {}
  goBack(event: Event): void {
    event.preventDefault();
    this.location.back();
  }
}
