import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGear,
  faEye,
  faEyeSlash,
  faUser,
  faBasketShopping,
  faBuildingColumns,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { ContactComponent } from '../contact/contact.component';
import { TransfertComponent } from '../transfert/transfert.component';
import { NewContactTransfertComponent } from '../new-contact-transfert/new-contact-transfert.component';
import { ParametreComponent } from '../parametre/parametre.component';
import { PaiementComponent } from '../paiement/paiement.component';
import { PaiementFactureComponent } from "../paiement-facture/paiement-facture.component";
import { PaiementRestoComponent } from "../paiement-resto/paiement-resto.component";
import { BanqueCodeComponent } from "../banque-code/banque-code.component";
import { BanqueComponent } from "../banque/banque.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    ContactComponent,
    TransfertComponent,
    NewContactTransfertComponent,
    ParametreComponent,
    PaiementComponent,
    PaiementFactureComponent,
    PaiementRestoComponent,
    BanqueCodeComponent,
    BanqueComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  faGear = faGear;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUser = faUser;
  faBasketShopping = faBasketShopping;
  faBuildingColumns = faBuildingColumns;
  faBars = faBars;
}
