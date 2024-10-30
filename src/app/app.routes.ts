import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { notAuthGuard } from './guard/not-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [notAuthGuard],
  },
  {
    path: 'web',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./contact/contact.component').then((m) => m.ContactComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./contact/contact.component').then((m) => m.ContactComponent),
      },
      {
        path: 'transfert',
        loadComponent: () =>
          import('./transfert/transfert.component').then((m) => m.TransfertComponent),
      },
      {
        path: 'paiement',
        loadComponent: () =>
          import('./paiement/paiement.component').then(
            (m) => m.PaiementComponent
          ),
      },
      {
        path: 'credit',
        loadComponent: () =>
          import('./credit/credit.component').then((m) => m.CreditComponent),
      },
      {
        path: 'banque',
        loadComponent: () =>
          import('./banque/banque.component').then((m) => m.BanqueComponent),
      },
      {
        path: 'parametre',
        loadComponent: () =>
          import('./parametre/parametre.component').then(
            (m) => m.ParametreComponent
          ),
      },
    ],
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
