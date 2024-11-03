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
import { ClientService } from '../services/client.service';
import { SignalBaseService } from '../services/signal-base.service';
import { CommonModule, Location } from '@angular/common';
import { IFournisseur } from '../interfaces/index.ts';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
@Component({
  selector: 'app-paiement-facture',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    SpinnerComponent,
  ],
  templateUrl: './paiement-facture.component.html',
  styleUrl: './paiement-facture.component.css',
})
export class PaiementFactureComponent implements OnInit {
  faArrowLeft = faArrowLeft;

  fournisseur = signal<Partial<IFournisseur> | undefined>(undefined);

  formFacture: FormGroup;
  soldeGlobal: any;
  isPaiementLoading = false;

  @ViewChild('errorRef')
  errorRef!: ElementRef<HTMLElement>;
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

    this.formFacture = new FormGroup({
      fournisseurId: new FormControl(this.fournisseur()?.id, [
        Validators.required,
      ]),
      typeFournisseur: new FormControl(
        this.fournisseur()?.type_fournisseur,
        []
      ),
      referentiel: new FormControl('', [Validators.required]),
      montant: new FormControl('', [
        Validators.required,
        Validators.min(100),
        Validators.max(this.soldeGlobal()),
      ]),
    });
  }

  ngOnInit(): void {
    // this.fournisseur.set(history.state['fournisseur']);
    // this.formFacture.patchValue({
    //   typeFournisseur: this.fournisseur()?.type_fournisseur,
    //   fournisseurId: this.fournisseur()?.id,
    // });
  }

  goBack(event: Event): void {
    event.preventDefault();
    this.location.back();
  }

  onSubmitPaiementFacture() {
    this.isPaiementLoading = true;

    if (this.formFacture.valid) {
      const { fournisseurId, typeFournisseur, referentiel, montant } =
        this.formFacture.value;
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
      if (this.formFacture.get('referentiel')?.hasError('required')) {
        this.errorRef.nativeElement.classList.remove('invisible');
        this.errorRef.nativeElement.innerHTML = 'Le Référentiel est requis';
      }
      if (this.formFacture.get('montant')?.hasError('required')) {
        this.errorMontant.nativeElement.classList.remove('invisible');
        this.errorMontant.nativeElement.innerHTML = 'Le montant est requis';
      }
      if (this.formFacture.get('montant')?.hasError('min')) {
        this.errorMontant.nativeElement.classList.remove('invisible');
        this.errorMontant.nativeElement.innerHTML =
          'Le montant doit être supérieur ou égal à 100';
      }
      if (this.formFacture.get('montant')?.hasError('max')) {
        this.errorMontant.nativeElement.classList.remove('invisible');
        this.errorMontant.nativeElement.innerHTML =
          'Le montant doit être inférieur ou égal au solde global';
      }
    }
  }
}
