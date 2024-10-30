import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import {
  faGear,
  faArrowRightArrowLeft,
  faLaptop,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ILoginResponse } from '../interfaces/index.ts';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    SpinnerComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  authTokenKey = environment.authTokenKey;
  router = inject(Router);

  faGear = faGear;
  faArrowRightArrowLeft = faArrowRightArrowLeft;
  faLaptop = faLaptop;
  faLink = faLink;

  isLoginLoading = false;
  isVerificationLoading = false;
  isVerificationFormActive = true;

  loginResponse: ILoginResponse = {
    codeVerification: '',
    id: 0,
    telephone: '',
  };

  @ViewChild('telephoneError') telephoneError!: ElementRef<HTMLElement>;
  @ViewChild('passwordError') passwordError!: ElementRef<HTMLElement>;
  @ViewChild('telephonePasswordError')
  telephonePasswordError!: ElementRef<HTMLElement>;
  @ViewChild('formVerifId') formVerifId!: ElementRef<HTMLFormElement>;
  @ViewChild('codeVerificationRequis')
  codeVerificationRequis!: ElementRef<HTMLElement>;
  @ViewChild('codeVerificationIncorrect')
  codeVerificationIncorrect!: ElementRef<HTMLElement>;

  formLogin: FormGroup;
  formVerification: FormGroup;

  errorState = {
    indicatif: '',
    telephone: '',
    password: '',
  };

  constructor(private authService: AuthService) {
    this.formLogin = new FormGroup({
      indicatif: new FormControl('+221', [Validators.required]),

      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(77|78|76)[0-9]{7}$/),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4}$/),
      ]),
    });

    this.formVerification = new FormGroup({
      code_verification: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmitLogin() {
    this.isLoginLoading = true;
    if (this.formLogin.valid) {
      this.telephoneError.nativeElement.classList.add('invisible');
      this.passwordError.nativeElement.classList.add('invisible');
      const telephone =
        this.formLogin.value.indicatif + '' + this.formLogin.value.telephone;
      this.authService
        .login(telephone, this.formLogin.value.password)
        .subscribe({
          next: (response) => {
            if (response.status === 'OK') {
              this.loginResponse = response.data;
              this.isLoginLoading = false;
              this.isVerificationFormActive = true;
            }
          },
          error: (error) => {
            if (error.error.status === 'KO') {
              this.telephonePasswordError.nativeElement.classList.remove(
                'invisible'
              );
              this.telephonePasswordError.nativeElement.innerHTML =
                error.error.message; // Corrected to error.message
              this.isLoginLoading = false;
            }
          },
        });
    } else {
      this.isLoginLoading = false;
      if (this.formLogin.get('telephone')?.hasError('required')) {
        this.telephoneError.nativeElement.classList.remove('invisible');
        this.telephoneError.nativeElement.innerHTML = 'Le telephone est requis';
      }
      if (this.formLogin.get('telephone')?.hasError('pattern')) {
        this.telephoneError.nativeElement.classList.remove('invisible');
        this.telephoneError.nativeElement.innerHTML =
          'Le telephone doit commencer par un 77, 78 ou 76 et contenir 7 chiffres';
      }
      if (this.formLogin.get('password')?.hasError('required')) {
        this.passwordError.nativeElement.classList.remove('invisible');
        this.passwordError.nativeElement.innerHTML =
          'Le mot de passe est requis';
      }
      if (this.formLogin.get('password')?.hasError('pattern')) {
        this.passwordError.nativeElement.classList.remove('invisible');
        this.passwordError.nativeElement.innerHTML =
          'Le mot de passe doit contenir 4 chiffres';
      }
    }
  }

  onSubmitVerification() {
    this.isVerificationLoading = true;
    if (this.formVerification.valid) {
      this.authService
        .verifyCode(this.formVerification.value.code_verification)
        .subscribe({
          next: (response) => {
            if (response.status == 'OK') {
              this.isVerificationLoading = false;
              localStorage.setItem(this.authTokenKey, response.data.token);
              console.log(1);

              this.router.navigate(['/web']);
            }
          },
          error: (error) => {
            if (error.error.status == 'KO') {
              this.isVerificationLoading = false;
              this.codeVerificationIncorrect.nativeElement.classList.remove(
                'invisible'
              );
              this.codeVerificationIncorrect.nativeElement.innerHTML =
                error.error.message; // Corrected to error.message
            }
          },
        });
    } else {
      this.isVerificationLoading = false;
      if (
        this.formVerification.get('code_verification')?.hasError('required')
      ) {
        this.codeVerificationRequis.nativeElement.classList.remove('invisible');
        this.codeVerificationRequis.nativeElement.innerHTML =
          'Le code de vérification est requis';
      }
    }
  }

  get indicatif() {
    return this.formLogin.get('indicatif');
  }

  get telephone() {
    return this.formLogin.get('telephone');
  }

  get password() {
    return this.formLogin.get('password');
  }
}
