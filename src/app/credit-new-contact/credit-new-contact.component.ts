import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SpinnerComponent } from '../spinner/spinner.component';
import { IContact } from '../interfaces/index.ts';
@Component({
  selector: 'app-new-contact-transfert',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    SpinnerComponent,
  ],
  templateUrl: './credit-new-contact.component.html',
  styleUrl: './credit-new-contact.component.css',
})
export class CreditNewContactComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  isNextLoading = false;
  formNewContact: FormGroup;

  @ViewChild('errorNom') errorNom!: ElementRef<HTMLElement>;
  @ViewChild('errorTelephone') errorTelephone!: ElementRef<HTMLElement>;

  constructor(private location: Location, private router: Router) {
    this.formNewContact = new FormGroup({
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ]+ [A-Za-zÀ-ÖØ-öø-ÿ]+$/),
      ]),
      indicatif: new FormControl('+221', [Validators.required]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(77|78|76)[0-9]{7}$/),
      ]),
    });
  }

  ngOnInit(): void {}

  goBack(event: Event): void {
    event.preventDefault();
    this.location.back();
  }

  onSubmitNewContact() {
    this.errorNom.nativeElement.classList.add('invisible');
    this.errorTelephone.nativeElement.classList.add('invisible');
    this.isNextLoading = true;
    console.log(this.formNewContact.value);

    if (this.formNewContact.valid) {
      const c: Partial<IContact> = {
        telephone:
          this.formNewContact.value.indicatif +
          this.formNewContact.value.telephone,
        nom: this.formNewContact.value.nom,
        id: 0,
        user_id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.router.navigate(['/web/credit-montant'], {
        state: {
          contact: c,
        },
      });

      this.isNextLoading = false;
    } else {
      this.isNextLoading = false;
      if (this.formNewContact.get('nom')?.hasError('required')) {
        this.errorNom.nativeElement.classList.remove('invisible');
        this.errorNom.nativeElement.innerHTML = 'Le nom est requis';
      }

      if (this.formNewContact.get('nom')?.hasError('pattern')) {
        this.errorNom.nativeElement.classList.remove('invisible');
        this.errorNom.nativeElement.innerHTML =
          'Donner le nom et le prénom séparés par un espace';
      }
      if (this.formNewContact.get('telephone')?.hasError('required')) {
        this.errorTelephone.nativeElement.classList.remove('invisible');
        this.errorTelephone.nativeElement.innerHTML = 'Le téléphone est requis';
      }
      if (this.formNewContact.get('telephone')?.hasError('pattern')) {
        this.errorTelephone.nativeElement.classList.remove('invisible');
        this.errorTelephone.nativeElement.innerHTML =
          'Le téléphone doit commencer par un 77, 78 ou 76 et contenir 7 chiffres';
      }
    }
  }
}
