import { Injectable } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse, ILoginResponse, IToken } from '../interfaces/index.ts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  authTokenKey = environment.authTokenKey;
  constructor(private httpClient: HttpClient) {}

  public login(
    telephone: string,
    password: string
  ): Observable<ApiResponse<ILoginResponse>> {
    return this.httpClient.post<ApiResponse<ILoginResponse>>(
      `${this.apiUrl}/login`,
      { telephone, password }
    );
  }

  public verifyCode(code: string): Observable<ApiResponse<IToken>> {
    return this.httpClient.post<ApiResponse<IToken>>(
      `${this.apiUrl}/verifytoken`,
      { code_verification: code }
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.authTokenKey);
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
}
