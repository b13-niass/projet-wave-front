import {
  AfterViewInit,
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
  faCamera,
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
import {
  IAccueilResponse,
  IContact,
  ITransaction,
} from '../interfaces/index.ts';
import { CommonModule } from '@angular/common';
import { MoneyFormatPipe } from '../pipes/money-format.pipe';
import { Observable, of } from 'rxjs';
import { SignalBaseService } from '../services/signal-base.service';
import { OrderByDatePipe } from '../pipes/order-by-date.pipe';
import {
  NgxScannerQrcodeModule,
  LOAD_WASM,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { BurgerMenuComponent } from '../burger-menu/burger-menu.component';
import { QrCodeComponent } from '../qr-code/qr-code.component';
import QrScannerComponent from 'ngx-scanner-qrcode';

LOAD_WASM().subscribe();

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
    OrderByDatePipe,
    NgxScannerQrcodeModule,
    BurgerMenuComponent,
    QrCodeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  faGear = faGear;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUser = faUser;
  faBasketShopping = faBasketShopping;
  faBuildingColumns = faBuildingColumns;
  faBars = faBars;
  faCamera = faCamera;

  soldeGlobal: any;

  showSolde: boolean = true;

  @ViewChild('soldeGlobalSpan') soldeGlobalSpan!: ElementRef<HTMLElement>;
  @ViewChild('qrcodeModal') qrcodeModal!: ElementRef<HTMLElement>;
  @ViewChild('menuSidebar') menuSidebar!: ElementRef<HTMLElement>;

  @ViewChild('action', { static: true })
  scanner!: QrScannerComponent.NgxScannerQrcodeComponent;

  homeData!: IAccueilResponse;
  // transactions$!: Observable<ITransaction[]>;
  transactions$: any;
  qr_code!: string;

  config = {
    isBeep: false,
    isAuto: true,
    text: { font: '25px serif' }, // Hiden { font: '0px' },
    frame: { lineWidth: 8 },
    medias: {
      audio: false,
      video: {
        facingMode: 'environment', // To require the rear camera https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    },
  };

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

        this.qr_code = data.data.qr_code;

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

  ngAfterViewInit() {}

  handleSlashEye() {
    this.showSolde = !this.showSolde;
  }

  handleDetailTransaction(idTransaction: number) {}

  handleDataFromChild(data: any) {}

  ngOnDestroy(): void {}

  handleQrCodeZone() {
    this.qrcodeModal.nativeElement.classList.remove('hidden');
    this.qrcodeModal.nativeElement.classList.add('flex');
  }
  closeModalQrCode() {
    this.qrcodeModal.nativeElement.classList.remove('flex');
    this.qrcodeModal.nativeElement.classList.add('hidden');
  }

  onEventScan(e: ScannerQRCodeResult[]) {
    this.clientService.getCompteByTelephone(e[0].value).subscribe({
      next: (data) => {
        if (data.status == 'OK') {
          const c: Partial<IContact> = {
            telephone: data.data.user.telephone,
            nom: data.data.user.nom,
            id: 0,
            user_id: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          this.qrcodeModal.nativeElement.classList.remove('flex');
          this.qrcodeModal.nativeElement.classList.add('hidden');

          this.router.navigate(['/web/transfert'], {
            state: {
              contact: c,
            },
          });
        }
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  handleBurger(event: boolean) {
    // this.isOpenMenu = event;
    if (event) {
      this.menuSidebar.nativeElement.classList.remove('max-sm:hidden');
      this.menuSidebar.nativeElement.classList.add('menu');
    } else {
      this.menuSidebar.nativeElement.classList.add('max-sm:hidden');
      this.menuSidebar.nativeElement.classList.remove('menu');
    }
  }

  onpenDetails(transaction: ITransaction){
    this.router.navigate(['/web/details-transaction'], { state: { transaction: transaction } });
  }
}
