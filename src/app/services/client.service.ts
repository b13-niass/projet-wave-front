import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  IAccueilResponse,
  IContactResponse,
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
}
