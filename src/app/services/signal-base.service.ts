import { Injectable, signal } from '@angular/core';
import { IFrais, ITransaction } from '../interfaces/index.ts';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class SignalBaseService {
  public solde = signal<number>(0);
  public frais = signal<IFrais | undefined>(undefined);
  public transactions = signal<ITransaction[]>([]);
  constructor() {}

  decodeToken(): any {
    const token = localStorage.getItem('authToken');
    try {
      return jwtDecode(token!);
    } catch (error) {
      console.error('Invalid JWT token');
      return null;
    }
  }
}
