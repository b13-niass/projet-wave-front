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
import { CommonModule } from '@angular/common';
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
  templateUrl: './transfert.component.html',
  styleUrl: './transfert.component.css',
})
export class TransfertComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faUser = faUser;

  @ViewChild('envoyeError')
  envoyeError!: ElementRef<HTMLElement>;
  @ViewChild('recusError')
  recusError!: ElementRef<HTMLElement>;
  @ViewChild('errorGlobal')
  errorGlobal!: ElementRef<HTMLElement>;

  contact = signal<IContact | undefined>(undefined);

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
      montant_envoye: new FormControl('', [
        Validators.required,
        Validators.min(100),
      ]),
      montant_recus: new FormControl('', [
        Validators.required,
        Validators.min(95),
      ]),
      telephone: new FormControl('', [Validators.required]),
    });
  }

  onSubmitTransfert() {
    if (this.formTransfert.valid && !this.isSoldeInssufisant) {
      console.log(1);
      this.isTransfertLoading = true;
      const { montant_recus, telephone, montant_envoye } =
        this.formTransfert.value;
      const actualSolde = this.signalBaseService.solde();
      this.clientService.makeTransfert(montant_recus, telephone).subscribe({
        next: (response) => {
          if (response.status === 'OK') {
            this.signalBaseService
              .transactions()
              .unshift(response.data.transaction);
            this.router.navigate(['/web']);
            this.isTransfertLoading = false;
            this.signalBaseService.solde.set(actualSolde - montant_envoye);
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
      if (this.formTransfert.get('montant_recus')?.hasError('required')) {
        this.recusError.nativeElement.classList.remove('invisible');
        this.recusError.nativeElement.innerHTML = 'Le montant recus est requis';
      }
      if (this.formTransfert.get('montant_envoye')?.hasError('required')) {
        this.envoyeError.nativeElement.classList.remove('invisible');
        this.envoyeError.nativeElement.innerHTML =
          'Le montant envoyé est requis';
      }
    }
  }

  handleChangeME() {
    const me = parseInt(this.formTransfert.get('montant_envoye')?.value);

    if (me >= 100) {
      this.formTransfert.patchValue({
        montant_recus: me - me * 0.01,
      });
    }

    if (me > this.soldeGlobal()) {
      this.errorGlobal.nativeElement.classList.remove('invisible');
      this.errorGlobal.nativeElement.innerHTML =
        'Le solde est insuffisant  pour effectuer ce transfert';
      this.isSoldeInssufisant = true;
    } else {
      this.errorGlobal.nativeElement.classList.add('invisible');
      this.isSoldeInssufisant = false;
    }
  }

  handleChangeMR() {
    const mr = parseInt(this.formTransfert.get('montant_recus')?.value);
    if (mr >= 95) {
      this.formTransfert.patchValue({
        montant_envoye: mr + mr * 0.01,
      });
    }
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

  ngOnInit(): void {
    this.contact.set(history.state['contact']);
    this.formTransfert.patchValue({
      telephone: this.contact()?.telephone,
    });
  }

}
