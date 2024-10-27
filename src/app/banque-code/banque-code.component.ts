import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-banque-code',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './banque-code.component.html',
  styleUrl: './banque-code.component.css'
})
export class BanqueCodeComponent {
  faArrowLeft = faArrowLeft;

}
