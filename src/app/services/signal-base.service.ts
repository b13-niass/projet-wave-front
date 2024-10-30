import { Injectable, signal } from '@angular/core';
import { IFrais, ITransaction } from '../interfaces/index.ts';

@Injectable({
  providedIn: 'root',
})
export class SignalBaseService {
  public solde = signal<number>(0);
  public frais = signal<IFrais | undefined>(undefined);
  public transactions = signal<ITransaction[]>([]);
  constructor() {}
}
