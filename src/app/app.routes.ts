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
        path: 'details-transaction',
        loadComponent: () =>
          import('./detail-transaction/detail-transaction.component').then((m) => m.DetailTransactionComponent),
      },
      {
        path: 'transfert',
        loadComponent: () =>
          import('./transfert/transfert.component').then(
            (m) => m.TransfertComponent
          ),
      },
      {
        path: 'new-contact-transfert',
        loadComponent: () =>
          import(
            './new-contact-transfert/new-contact-transfert.component'
          ).then((m) => m.NewContactTransfertComponent),
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
        path: 'credit-montant',
        loadComponent: () =>
          import('./credit-montant/credit-montant.component').then(
            (m) => m.CreditMontantComponent
          ),
      },
      {
        path: 'credit-new-contact',
        loadComponent: () =>
          import('./credit-new-contact/credit-new-contact.component').then(
            (m) => m.CreditNewContactComponent
          ),
      },
      {
        path: 'banque',
        loadComponent: () =>
          import('./banque/banque.component').then((m) => m.BanqueComponent),
      },
      {
        path: 'paiement-facture',
        loadComponent: () =>
          import('./paiement-facture/paiement-facture.component').then(
            (m) => m.PaiementFactureComponent
          ),
      },
      {
        path: 'paiement-resto',
        loadComponent: () =>
          import('./paiement-resto/paiement-resto.component').then(
            (m) => m.PaiementRestoComponent
          ),
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
