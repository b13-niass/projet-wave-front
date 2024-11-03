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
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IFournisseur } from '../interfaces/index.ts';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../services/client.service.js';
import { SignalBaseService } from '../services/signal-base.service';
import { CommonModule, Location } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component.js';
@Component({
  selector: 'app-paiement-resto',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './paiement-resto.component.html',
  styleUrl: './paiement-resto.component.css',
})
export class PaiementRestoComponent implements OnInit {
  faArrowLeft = faArrowLeft;

  fournisseur = signal<Partial<IFournisseur> | undefined>(undefined);

  formResto: FormGroup;
  soldeGlobal: any;
  isPaiementLoading = false;

  @ViewChild('errorMontant')
  errorMontant!: ElementRef<HTMLElement>;
  @ViewChild('errorGlobal')
  errorGlobal!: ElementRef<HTMLElement>;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private signalBaseService: SignalBaseService,
    private location: Location
  ) {
    this.fournisseur.set(history.state['fournisseur']);
    this.soldeGlobal = computed(() => this.signalBaseService.solde());

    this.formResto = new FormGroup({
      fournisseurId: new FormControl(this.fournisseur()?.id, [
        Validators.required,
      ]),
      typeFournisseur: new FormControl(
        this.fournisseur()?.type_fournisseur,
        []
      ),
      montant: new FormControl('', [
        Validators.required,
        Validators.min(100),
        Validators.max(this.soldeGlobal()),
      ]),
    });
  }

  ngOnInit(): void {
    // this.fournisseur.set(history.state['fournisseur']);
  }

  goBack(event: Event): void {
    event.preventDefault();
    this.location.back();
  }

  onSubmitFormResto() {
    this.isPaiementLoading = true;

    if (this.formResto.valid) {
      const { fournisseurId, typeFournisseur, referentiel, montant } =
        this.formResto.value;
      this.clientService
        .payerFacture(fournisseurId, typeFournisseur, referentiel, montant)
        .subscribe({
          next: (response) => {
            if (response.status == 'OK') {
              this.isPaiementLoading = false;
              this.signalBaseService.solde.set(this.soldeGlobal() - montant);
              this.signalBaseService
                .transactions()
                .unshift(response.data.transaction);
              this.router.navigate(['/web/paiement']);
            }
          },
          error: (error) => {
            this.isPaiementLoading = false;
            console.log(error.error.data);

            if (error.error.status == 'KO') {
              this.errorGlobal.nativeElement.classList.remove('invisible');
              this.errorGlobal.nativeElement.innerHTML = error.error.message;
            }
          },
        });
    } else {
      this.isPaiementLoading = false;

      if (this.formResto.get('montant')?.hasError('required')) {
        this.errorMontant.nativeElement.classList.remove('invisible');
        this.errorMontant.nativeElement.innerHTML = 'Le montant est requis';
      }
      if (this.formResto.get('montant')?.hasError('min')) {
        this.errorMontant.nativeElement.classList.remove('invisible');
        this.errorMontant.nativeElement.innerHTML =
          'Le montant doit être supérieur ou égal à 100';
      }
      if (this.formResto.get('montant')?.hasError('max')) {
        this.errorMontant.nativeElement.classList.remove('invisible');
        this.errorMontant.nativeElement.innerHTML =
          'Le montant doit être inférieur ou égal au solde global';
      }
    }
  }
}
