import {
  Component,
  computed,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
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
import { PaiementFactureComponent } from '../paiement-facture/paiement-facture.component';
import { PaiementRestoComponent } from '../paiement-resto/paiement-resto.component';
import { BanqueCodeComponent } from '../banque-code/banque-code.component';
import { BanqueComponent } from '../banque/banque.component';
import { ClientService } from '../services/client.service';
import { IAccueilResponse, ITransaction } from '../interfaces/index.ts';
import { CommonModule } from '@angular/common';
import { MoneyFormatPipe } from '../pipes/money-format.pipe';
import { Observable, of } from 'rxjs';
import { SignalBaseService } from '../services/signal-base.service';
import { OrderByDatePipe } from '../pipes/order-by-date.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
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
    BanqueComponent,
    MoneyFormatPipe,
    OrderByDatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  faGear = faGear;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUser = faUser;
  faBasketShopping = faBasketShopping;
  faBuildingColumns = faBuildingColumns;
  faBars = faBars;

  soldeGlobal: any;

  showSolde: boolean = true;

  @ViewChild('soldeGlobalSpan') soldeGlobalSpan!: ElementRef<HTMLElement>;

  homeData!: IAccueilResponse;
  // transactions$!: Observable<ITransaction[]>;
  transactions$: any;
  constructor(
    private router: Router,
    private clientService: ClientService,
    private signalBaseService: SignalBaseService
  ) {}

  ngOnInit(): void {
    this.transactions$ = computed(() => this.signalBaseService.transactions());
    this.soldeGlobal = computed(() => this.signalBaseService.solde());

    this.clientService.getAcceuilData().subscribe({
      next: (data) => {
        this.homeData = data.data;
        this.signalBaseService.solde.set(this.homeData.wallet.solde);

        this.signalBaseService.transactions.set([
          ...this.homeData.user.transactionsReceived,
          ...this.homeData.user.transactionsSent,
        ]);

        // this.transactions$ = of([
        //   ...this.homeData.user.transactionsReceived,
        //   ...this.homeData.user.transactionsSent,
        // ]);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  handleSlashEye() {
    this.showSolde = !this.showSolde;
  }

  handleDetailTransaction(idTransaction: number) {}

  handleDataFromChild(data: any) {}

  ngOnDestroy(): void {}
}
