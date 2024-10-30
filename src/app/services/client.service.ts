import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  IAccueilResponse,
  IContactResponse,
  IFraisResponse,
  ITransfertResponse,
} from '../interfaces/index.ts';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  apiUrl = environment.apiUrl + '/client';
  authTokenKey = environment.authTokenKey;
  constructor(private httpClient: HttpClient) {}

  public getAcceuilData(): Observable<ApiResponse<IAccueilResponse>> {
    return this.httpClient.get<ApiResponse<IAccueilResponse>>(
      this.apiUrl + '/accueil'
    );
  }

  public getContacts(): Observable<ApiResponse<IContactResponse>> {
    return this.httpClient.get<ApiResponse<IContactResponse>>(
      this.apiUrl + '/contacts'
    );
  }

  public getGetFrais(): Observable<ApiResponse<IFraisResponse>> {
    return this.httpClient.get<ApiResponse<IFraisResponse>>(
      this.apiUrl + '/frais'
    );
  }

  public makeTransfert(montant_recus: number, telephone: string): Observable<ApiResponse<ITransfertResponse>> {
    return this.httpClient.post<ApiResponse<ITransfertResponse>>(
      `${this.apiUrl}/transfert`,
      { montant_recus, telephone }
    );
  }
}
