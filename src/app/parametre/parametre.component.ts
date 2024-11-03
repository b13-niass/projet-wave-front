import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-parametre',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    SpinnerComponent,
  ],
  templateUrl: './parametre.component.html',
  styleUrl: './parametre.component.css',
})
export class ParametreComponent {
  faArrowLeft = faArrowLeft;

  constructor(private location: Location, private router: Router) {}

  goBack(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/web/contact']);
  }
}
