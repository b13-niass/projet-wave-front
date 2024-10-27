import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGear,
  faArrowRightArrowLeft,
  faLaptop,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  faGear = faGear;
  faArrowRightArrowLeft = faArrowRightArrowLeft;
  faLaptop = faLaptop;
  faLink = faLink;
}
