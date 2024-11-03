import {
  Component,
  computed,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { IContact } from '../interfaces/index.ts';
import { SignalBaseService } from '../services/signal-base.service.js';
import { CommonModule, Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../services/client.service.js';
import { SpinnerComponent } from '../spinner/spinner.component.js';
@Component({
  selector: 'app-transfert',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    SpinnerComponent,
  ],
  templateUrl: './credit-montant.component.html',
  styleUrl: './credit-montant.component.css',
})
export class CreditMontantComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faUser = faUser;

  @ViewChild('envoyeError')
  envoyeError!: ElementRef<HTMLElement>;
  @ViewChild('recusError')
  recusError!: ElementRef<HTMLElement>;
  @ViewChild('errorGlobal')
  errorGlobal!: ElementRef<HTMLElement>;

  contact = signal<Partial<IContact> | undefined>(undefined);

  isTransfertLoading = false;

  isSoldeInssufisant = true;

  formTransfert: FormGroup;
  soldeGlobal: any;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private signalBaseService: SignalBaseService,
    private location: Location
  ) {
    this.soldeGlobal = computed(() => this.signalBaseService.solde());

    this.formTransfert = new FormGroup({
      montant: new FormControl('', [Validators.required, Validators.min(95)]),
      telephone: new FormControl('', [Validators.required]),
    });
  }

  onSubmitTransfert() {
    if (this.formTransfert.valid && !this.isSoldeInssufisant) {
      this.isTransfertLoading = true;
      const { montant, telephone } = this.formTransfert.value;
      const actualSolde = this.signalBaseService.solde();
      
      this.clientService.achatCredit(montant, telephone).subscribe({
        next: (response) => {
          if (response.status === 'OK') {
            this.signalBaseService
              .transactions()
              .unshift(response.data.transaction);
            this.router.navigate(['/web']);
            this.isTransfertLoading = false;
            this.signalBaseService.solde.set(actualSolde - montant);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.isTransfertLoading = false;
          if (error.error.status == 'KO') {
            this.errorGlobal.nativeElement.classList.remove('invisible');
            this.errorGlobal.nativeElement.innerHTML = error.error.message;
          }
        },
      });

    } else {
      this.isTransfertLoading = false;
      if (this.formTransfert.get('montant')?.hasError('required')) {
        this.recusError.nativeElement.classList.remove('invisible');
        this.recusError.nativeElement.innerHTML = 'Le montant recus est requis';
      }
    }
  }

  handleChangeMR() {
    const mr = parseInt(this.formTransfert.get('montant')?.value);
    if (mr > this.soldeGlobal()) {
      this.errorGlobal.nativeElement.classList.remove('invisible');
      this.errorGlobal.nativeElement.innerHTML =
        'Le solde est insuffisant pour effectuer ce transfert';
      this.isSoldeInssufisant = true;
    } else {
      this.errorGlobal.nativeElement.classList.add('invisible');
      this.isSoldeInssufisant = false;
    }
  }

  goBack(event: Event): void {
    event.preventDefault();
    this.location.back();
  }

  ngOnInit(): void {
    this.contact.set(history.state['contact']);
    this.formTransfert.patchValue({
      telephone: this.contact()?.telephone,
    });
  }
}
